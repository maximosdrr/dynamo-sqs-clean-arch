import { SQSClient } from "@aws-sdk/client-sqs";
import { ProductQueue } from "../message-brokers/sqs/queues/product";
import { Sqs } from "../message-brokers/sqs/sqs";
import { DI } from "./container";

export async function RegisterMessageBrokers() {
  const container = DI.getInstance().container;

  const sqs = await Sqs.createClient();

  container.bind(SQSClient).toConstantValue(sqs);
  container.bind(Sqs).to(Sqs);

  //queues
  container.bind(ProductQueue).to(ProductQueue);
}
