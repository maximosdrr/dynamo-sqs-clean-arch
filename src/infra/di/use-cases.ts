import { CreateProductUseCase } from '../../application/product/use-cases/create';
import { FindManyProductUseCase } from '../../application/product/use-cases/find-many';
import { UpdateQuantityProductUseCase } from '../../application/product/use-cases/update-quatity';
import { DI } from './container';

export function RegisterUseCases() {
  const container = DI.getInstance().container;

  container.bind(CreateProductUseCase).to(CreateProductUseCase);
  container.bind(FindManyProductUseCase).to(FindManyProductUseCase);
  container.bind(UpdateQuantityProductUseCase).to(UpdateQuantityProductUseCase);
}
