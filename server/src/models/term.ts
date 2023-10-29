import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { OptionType } from "./enums/OptionTypeEnum";

// User Config
const OptionSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  description: { type: String, required: true },
  type: { type: OptionType, required: true },
});

const TermSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  isActual: { type: Boolean, required: true },
  options: [OptionSchema],
});

export const Term = mongoose.model("Term", TermSchema);
