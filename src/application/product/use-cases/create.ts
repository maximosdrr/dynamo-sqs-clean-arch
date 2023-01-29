import { inject, injectable } from "inversify";
import { IdGenerator } from "../../../core/hash-lib";
import { ProductRepository } from "../interfaces/product-repository.interface";
import { Product } from "../interfaces/product.interface";

@injectable()
export class CreateProductUseCase {
  private readonly idGenerator: IdGenerator = new IdGenerator();

  constructor(
    @inject(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(product: Product): Promise<Product> {
    const uuid = this.idGenerator.generateId();

    return await this.productRepository.create({
      ...product,
      id: uuid,
      quantity: 0,
    });
  }
}
