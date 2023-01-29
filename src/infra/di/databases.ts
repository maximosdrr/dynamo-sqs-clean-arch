import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDB as DB } from "../database/dynamo";
import { DI } from "./container";

export async function RegisterDatabase() {
  const container = DI.getInstance().container;

  const client = await DB.createClient();

  container.bind(DynamoDBClient).toConstantValue(client);
}
