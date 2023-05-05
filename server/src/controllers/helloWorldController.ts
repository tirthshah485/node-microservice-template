import { Request, Response } from "express";
import { Logger } from "../services";

const logger = new Logger(); // create a new instance of the Logger class

export function helloWorldController(req: Request, res: Response) {
  res.send("Hello, World!");
  logger.info("Hello, World!");
}