import crypto from "crypto";
import { UserData } from "interfaces/user";

const SECRET = process.env.SECRET || "SECRET";

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const cryptography = (salt: string, data: UserData): string => {
  const cipher = crypto.createCipher("aes-256-cbc", SECRET);
  let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
  encrypted += cipher.final("hex");

  const hmac = crypto.createHmac("sha256", salt);
  hmac.update(encrypted);
  const hash = hmac.digest("hex");

  return `${hash}:${encrypted}`;
};

export const decryption = (
  salt: string,
  encryptedData: string
): UserData | null => {
  const [hash, data] = encryptedData.split(":");

  const hmac = crypto.createHmac("sha256", salt);
  hmac.update(data);
  const calculatedHash = hmac.digest("hex");

  if (hash !== calculatedHash) {
    // A hash não coincide, a integridade dos dados foi comprometida
    return null;
  }

  const decipher = crypto.createDecipher("aes-256-cbc", SECRET);
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return JSON.parse(decrypted);
};

export const random = () => crypto.randomBytes(128).toString("base64");
