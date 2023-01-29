import express from "express";
import { ExpressRouter } from "./routes/router";

export class ExpressServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    const expressRouter = new ExpressRouter();

    this.app.use(express.json());
    this.app.use(expressRouter.router);
  }

  run() {
    this.app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
}
