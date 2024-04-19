import http from "node:http";
import { AddressInfo } from "node:net";

import express, { Express } from "express";
import logger from "morgan";

import router from "./routes";
import { connectDB } from "./config/mysql";
import { corsMiddleware } from "./middlewares/cors";

const PORT = process.env.PORT ?? 3000;

export class Server {
  private readonly app: Express;
  private httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(corsMiddleware());
    this.app.disable("x-powered-by");

    // TODO: Connect to the database
    connectDB();

    this.app.use(logger("dev"));
    this.app.use(express.static("storage"));
    this.app.use("/api", router);
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(PORT, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
        console.log(
          `⚡️[server]: Server is running at http://localhost:${port}`
        );
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
