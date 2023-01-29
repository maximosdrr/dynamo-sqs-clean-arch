import { inject, injectable } from 'inversify';
import {
  ProductRepository,
  UpdateQuantityResult
} from '../interfaces/product-repository.interface';
import { Product } from '../interfaces/product.interface';

@injectable()
export class UpdateQuantityProductUseCase {
  constructor(
    @inject(ProductRepository) private readonly repository: ProductRepository
  ) {}

  async execute(product: Partial<Product>): Promise<UpdateQuantityResult> {
    if (!product.id) throw new Error('Product id is required');
    if (!product.quantity) throw new Error('Product quantity is required');
    return await this.repository.updateQuantity({
      id: product.id,
      quantity: product.quantity
    });
  }
}
