import { Request, Response } from "express";

export interface HandlerInput {
  headers?: Record<string, string>;
  body?: Record<string, any>;
  params?: Record<string, string>;
  query?: Record<string, string>;
}

export interface HandlerOutput {
  status: number;
  data?: Record<string, any> | null;
  headers?: Record<string, string>;
}

export interface Controller {
  handle: (input: HandlerInput) => Promise<HandlerOutput>;
}
