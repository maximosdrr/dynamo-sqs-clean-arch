import { SQSClient, SQS, Message } from "@aws-sdk/client-sqs";
import { inject, injectable } from "inversify";
import { UpdateProductQuantityController } from "../../../../application/product/controllers/update-product-quantity";

@injectable()
export class ProductQueue {
  constructor(
    @inject(SQSClient) private readonly sqsClient: SQS,
    @inject(UpdateProductQuantityController)
    private readonly updateProductQuantity: UpdateProductQuantityController
  ) {}

  public getMessages() {
    console.log("[ProductQueue] Find new messages...]");
    this.sqsClient.receiveMessage(
      {
        QueueUrl: process.env.PRODUCT_QUEUE_URL,
        WaitTimeSeconds: 10,
      },
      async (err, data) => {
        if (err) console.log(err);

        for (const message of data?.Messages || []) {
          const isInvalidMessage = !this.validateMessage(message?.Body ?? "");

          if (isInvalidMessage) {
            await this.ackMessage(message);
            continue;
          }

          const messageParsed = this.parseMessage(message?.Body ?? "");

          await this.updateProductQuantity.handle({
            body: {
              id: messageParsed.id,
              quantity: messageParsed.quantity,
            },
          });

          await this.ackMessage(message);
        }
      }
    );
  }

  private async ackMessage(message: Message) {
    await this.sqsClient.deleteMessage({
      QueueUrl: process.env.PRODUCT_QUEUE_URL,
      ReceiptHandle: message.ReceiptHandle,
    });
  }

  private validateMessage(message: string) {
    try {
      const messageParsed = this.parseMessage(message);

      if (!messageParsed?.id || !messageParsed?.quantity) return false;

      return true;
    } catch (e) {
      return false;
    }
  }

  private parseMessage(message: string): { id: string; quantity: number } {
    return JSON.parse(message);
  }
}
