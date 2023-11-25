import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose, { Model } from "mongoose";
import { config } from "./config/config";
import { IKey, IUser } from "./interfaces/user";
import { UserSchema } from "./models/users";
import { ITerm } from "./interfaces/term";
import { TermSchema } from "./models/term";
import { KeySchema } from "./models/key";

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

const mongoConnection = mongoose.createConnection(config.mongo.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const mongoKeysConnection = mongoose.createConnection(config.mongoKeys.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.Promise = Promise;

app.use("/", router());

const User: Model<IUser> = mongoConnection.model<IUser>("User", UserSchema);

const Term: Model<ITerm> = mongoConnection.model<ITerm>("Term", TermSchema);

const Key: Model<IKey> = mongoKeysConnection.model<IKey>("Key", KeySchema);

export { mongoConnection, mongoKeysConnection, User, Term, Key };
