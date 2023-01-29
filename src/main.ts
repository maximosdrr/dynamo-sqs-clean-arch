import 'reflect-metadata';
import { config as setupEnv } from 'dotenv';

import { DI } from './infra/di/container';
import { ExpressServer } from './infra/http/express/server';
import { Sqs } from './infra/message-brokers/sqs/sqs';

export async function main() {
  setupEnv();
  const di = DI.getInstance();
  await di.register();

  const sqsClient = di.container.get(Sqs);

  sqsClient.start();

  const expressServer = new ExpressServer();

  expressServer.run();
}

main();
