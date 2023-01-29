import { inject, injectable } from "inversify";
import {
  Controller,
  HandlerInput,
  HandlerOutput,
} from "../../../core/controller";
import { FindManyProductUseCase } from "../use-cases/find-many";

@injectable()
export class FindManyProductUseController implements Controller {
  constructor(
    @inject(FindManyProductUseCase)
    private readonly findManyUseCase: FindManyProductUseCase
  ) {}

  async handle(_: HandlerInput): Promise<HandlerOutput> {
    const products = await this.findManyUseCase.execute();

    return {
      status: 200,
      data: {
        products,
      },
    };
  }
}
