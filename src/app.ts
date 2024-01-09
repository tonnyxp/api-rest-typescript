import express, { Express, Request, Response, json } from "express";
import logger from "morgan";

import router from "./routes";
import { connectDB } from "./config/mysql";
import { corsMiddleware } from "./middlewares/cors";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

connectDB();

app.use(logger("dev"));
app.use(express.static("storage"));
app.use("/api", router);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
