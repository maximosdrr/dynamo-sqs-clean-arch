import * as AWS from '@aws-sdk/client-sqs';
import { injectable } from 'inversify';
import { DI } from '../../di/container';
import { ProductQueue } from './queues/product';
import cron from 'node-cron';

@injectable()
export class Sqs {
  private productQueue: ProductQueue;
  private container = DI.getInstance().container;

  constructor() {
    this.productQueue = this.container.get<ProductQueue>(ProductQueue);
  }

  static async createClient(): Promise<AWS.SQS> {
    return new AWS.SQS({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
      }
    });
  }

  start() {
    cron.schedule('*/1 * * * *', () => {
      this.productQueue.getMessages();
    });
  }
}
