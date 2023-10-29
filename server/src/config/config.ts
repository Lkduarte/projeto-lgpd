import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8080;

//Database
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DATA_BASE = process.env.MONGO_DATA_BASE || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DATA_BASE}.qigcppe.mongodb.net/lgpd-db`;

//JWT
const SERVER_TOKEN_EXPIRATION = process.env.SERVER_TOKEN_EXPIRATION || 3000;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  token: {
    expireTime: SERVER_TOKEN_EXPIRATION,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};
