import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";
import { config } from "./config/config";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(config.server.port, () => {
  console.log(`Server running on http://localhost:${config.server.port}/`);
});

mongoose.Promise = Promise;

mongoose.connect(config.mongo.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
