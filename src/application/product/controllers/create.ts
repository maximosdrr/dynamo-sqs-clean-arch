import { inject, injectable } from "inversify";
import {
  HandlerInput,
  HandlerOutput,
  Controller,
} from "../../../core/controller";
import { Product } from "../interfaces/product.interface";
import { CreateProductUseCase } from "../use-cases/create";

@injectable()
export class CreateProductController implements Controller {
  constructor(
    @inject(CreateProductUseCase)
    private readonly createUserUseCase: CreateProductUseCase
  ) {}

  async handle(input: HandlerInput): Promise<HandlerOutput> {
    const data = input?.body as Product;

    const product = await this.createUserUseCase.execute(data);

    return {
      status: 200,
      data: {
        message: "Product created successfully",
        product,
      },
    };
  }
}
