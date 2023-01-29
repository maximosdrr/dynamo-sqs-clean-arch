import { Request, Response } from "express";
import { Controller } from "../../../core/controller";

export class ExpressAdapter {
  static async adapt(req: Request, res: Response, controller: Controller) {
    const controllerResult = await controller.handle({
      body: req.body,
      headers: req.headers as Record<string, any>,
      params: req.params,
      query: req.query as Record<string, any>,
    });

    return res.status(controllerResult.status).send(controllerResult.data);
  }
}
