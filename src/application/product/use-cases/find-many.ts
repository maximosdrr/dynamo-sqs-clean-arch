import { inject, injectable } from "inversify";
import { ProductRepository } from "../interfaces/product-repository.interface";
import { Product } from "../interfaces/product.interface";

@injectable()
export class FindManyProductUseCase {
  constructor(
    @inject(ProductRepository) private readonly repository: ProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return await this.repository.findMany();
  }
}
