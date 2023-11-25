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

// KEYS Database
const MONGO_KEYS_USERNAME = process.env.MONGO_KEYS_USERNAME || "";
const MONGO_KEYS_PASSWORD = process.env.MONGO_KEYS_PASSWORD || "";
const MONGO_KEYS_DATABASE = process.env.MONGO_KEYS_DATABASE || "";
const MONGO_KEYS_URL = `mongodb+srv://codelabfatec:E7byh01Zuy09pq7b@lgpdkeys.l4tfbgf.mongodb.net/`;

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
  mongoKeys: {
    url: MONGO_KEYS_URL,
  },
};
