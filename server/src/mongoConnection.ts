// mongoConnection.js

import mongoose, { Model } from "mongoose";
import { config } from "./config/config";
import { IUser } from "interfaces/user";

let mongoConnection: mongoose.Connection;
let mongoKeysConnection: mongoose.Connection;

const initMongoConnection = async () => {
  try {
    if (!mongoConnection) {
      mongoConnection = await mongoose.createConnection(config.mongo.url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      console.log("MongoDB connected");
    }

    if (!mongoKeysConnection) {
      mongoKeysConnection = await mongoose.createConnection(
        config.mongoKeys.url,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
      );
    }

    mongoose.Promise = Promise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export { initMongoConnection };
