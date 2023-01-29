import { inject, injectable } from "inversify";
import {
  Controller,
  HandlerInput,
  HandlerOutput,
} from "../../../core/controller";
import { UpdateQuantityProductUseCase } from "../use-cases/update-quatity";

@injectable()
export class UpdateProductQuantityController implements Controller {
  constructor(
    @inject(UpdateQuantityProductUseCase)
    private readonly updateProductQuantity: UpdateQuantityProductUseCase
  ) {}

  async handle(input: HandlerInput): Promise<HandlerOutput> {
    const body = input?.body as { id: string; quantity: number };
    await this.updateProductQuantity.execute({
      id: body.id,
      quantity: body.quantity,
    });

    return {
      status: 200,
      data: {
        updated: true,
        id: body.id,
        quantity: body.quantity,
      },
    };
  }
}
