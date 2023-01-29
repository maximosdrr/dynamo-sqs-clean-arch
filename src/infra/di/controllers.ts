import { CreateProductController } from '../../application/product/controllers/create';
import { FindManyProductUseController } from '../../application/product/controllers/find-many';
import { UpdateProductQuantityController } from '../../application/product/controllers/update-product-quantity';
import { DI } from './container';

export function RegisterControllers() {
  const container = DI.getInstance().container;
  container.bind(CreateProductController).to(CreateProductController);
  container.bind(FindManyProductUseController).to(FindManyProductUseController);
  container
    .bind(UpdateProductQuantityController)
    .to(UpdateProductQuantityController);
}
