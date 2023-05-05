// module imports
import * as dotenv from "dotenv";
import express, { Application } from "express";

// internal imports
import { Server } from "./server";

// configuring dotenv
dotenv.config();

// initializing express app
const app: Application = express();

// initalizing a server instance
const server = new Server(app);

// starting server at PORT
server.start(process.env.PORT);
