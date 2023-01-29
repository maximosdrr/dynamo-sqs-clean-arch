import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { inject, injectable } from "inversify";
import { PRODUCT_TABLE_NAME } from "../../../infra/constants";
import {
  ProductRepository,
  UpdateQuantityResult,
} from "../interfaces/product-repository.interface";
import { Product } from "../interfaces/product.interface";

@injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @inject(DynamoDBClient) private readonly dynamoClient: DynamoDBClient
  ) {}

  async create(product: Product): Promise<Product> {
    const Item = marshall({ ...product });

    const command = new PutItemCommand({
      TableName: PRODUCT_TABLE_NAME,
      Item,
    });

    await this.dynamoClient.send(command);
    return product;
  }

  async findMany(): Promise<Product[]> {
    const command = new ScanCommand({
      TableName: PRODUCT_TABLE_NAME,
    });

    const { Items } = await this.dynamoClient.send(command);

    const result = Items?.map((i) => unmarshall(i)) ?? [];

    return result as unknown as Product[];
  }

  async update(product: Product): Promise<Product> {
    const command = new UpdateItemCommand({
      TableName: PRODUCT_TABLE_NAME,
      Key: marshall({ id: product.id }),
      AttributeUpdates: {
        name: { Action: "PUT", Value: { S: product?.name } },
        description: { Action: "PUT", Value: { S: product?.description } },
        price: { Action: "PUT", Value: { N: product?.price?.toString() } },
      },
    });

    await this.dynamoClient.send(command);

    return product;
  }

  async updateQuantity(
    product: Pick<Product, "id" | "quantity">
  ): Promise<UpdateQuantityResult> {
    const command = new UpdateItemCommand({
      TableName: PRODUCT_TABLE_NAME,
      Key: marshall({ id: product.id }),
      AttributeUpdates: {
        quantity: {
          Action: "PUT",
          Value: { N: product?.quantity?.toString() },
        },
      },
    });

    await this.dynamoClient.send(command);

    return {
      id: product.id,
      quantity: product.quantity,
    };
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteItemCommand({
      TableName: PRODUCT_TABLE_NAME,
      Key: marshall({ id }),
    });

    await this.dynamoClient.send(command);
  }
}
