import mongoose from "mongoose";
import { nanoid } from "nanoid";

// User Config
export const UserSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  data: { type: String, required: true },
  // data: {
  //   name: { type: String, required: true },
  //   lastName: { type: String, required: true },
  //   cpf: { type: String, required: true },
  // email: { type: String, required: true },
  //   phone: { type: String, required: true },
  //   address: {
  //     cep: { type: String, required: true },
  //     street: { type: String, required: true },
  //     number: { type: String, required: true },
  //     complement: { type: String, required: false },
  //     neighborhood: { type: String, required: true },
  //     city: { type: String, required: true },
  //     state: { type: String, required: true },
  //     country: { type: String, required: true },
  //   },
  // },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});
