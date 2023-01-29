import { Container } from "inversify";
import { RegisterControllers } from "./controllers";
import { RegisterDatabase } from "./databases";
import { RegisterMessageBrokers } from "./message-brokers";
import { RegisterRepositories } from "./repositories";
import { RegisterUseCases } from "./use-cases";

export const container = new Container();

export class DI {
  private static instance: DI | null = null;
  public container: Container;

  constructor() {
    this.container = new Container();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DI();
      return this.instance;
    }

    return this.instance;
  }

  async register() {
    await RegisterDatabase();
    RegisterRepositories();
    RegisterUseCases();
    RegisterControllers();
    await RegisterMessageBrokers();
  }
}
