import { Product } from "./product.interface";

export interface UpdateQuantityResult {
  id: string;
  quantity: number;
}

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findMany(): Promise<Product[]>;
  abstract update(product: Product): Promise<Product>;
  abstract updateQuantity(
    product: Pick<Product, "id" | "quantity">
  ): Promise<UpdateQuantityResult>;
  abstract delete(id: string): Promise<void>;
}
