import { Router } from 'express';
import { CreateProductController } from '../../../../application/product/controllers/create';
import { FindManyProductUseController } from '../../../../application/product/controllers/find-many';
import { DI } from '../../../di/container';
import { ExpressAdapter } from '../express-adapter';

export class ProductRouter {
  private container = DI.getInstance().container;

  constructor(private router: Router) {}

  registerRoutes() {
    const create = this.container.get(CreateProductController);
    const findMany = this.container.get(FindManyProductUseController);

    this.router.post('/product', (req, res) =>
      ExpressAdapter.adapt(req, res, create)
    );

    this.router.get('/product', (req, res) =>
      ExpressAdapter.adapt(req, res, findMany)
    );
  }
}
