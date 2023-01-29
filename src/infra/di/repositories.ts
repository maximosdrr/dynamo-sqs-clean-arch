import { ProductRepository } from "../../application/product/interfaces/product-repository.interface";
import { ProductRepositoryImpl } from "../../application/product/repositories/product.repository";
import { DI } from "./container";

export function RegisterRepositories() {
  const container = DI.getInstance().container;

  container.bind(ProductRepository).to(ProductRepositoryImpl);
}
