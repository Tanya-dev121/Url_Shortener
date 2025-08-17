import mongoose, { model } from "mongoose";

const UrlSchema = mongoose.Schema({
  long_url: String,
  generatedCode: String,
});

export const UrlModel = mongoose.model("UrlModel", UrlSchema);
