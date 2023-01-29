import express from 'express';
import { ProductRouter } from './product';

export class ExpressRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    new ProductRouter(this.router).registerRoutes();
  }
}
