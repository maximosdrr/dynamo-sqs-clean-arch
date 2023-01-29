import * as AWS from '@aws-sdk/client-dynamodb';

export class DynamoDB {
  static async createClient(): Promise<AWS.DynamoDBClient> {
    return new AWS.DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
      }
    });
  }
}
