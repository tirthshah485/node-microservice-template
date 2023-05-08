import { Request, Response } from "express";
import { Logger } from "../services";
import { MongoDBService } from "../services";

const logger = new Logger(); // create a new instance of the Logger class

export async function helloWorldController(req: Request, res: Response) {
  const mongoService = MongoDBService.getInstance();
  await mongoService.connect('myDatabase');

  const db = mongoService.getDb();
  await mongoService.insertData("myCollection", { name: "John", age: 25 });

  const result = await mongoService.getData("myCollection", { age: { $gt: 26 } });
  logger.info(result);

  res.send("Hello, World!");
  logger.info("Hello, World!");
}