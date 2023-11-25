import mongoose from "mongoose";

// Key Config
export const KeySchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  key: { type: String, required: true },
});
