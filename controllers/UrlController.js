import { UrlModel } from "../models/UrlModel.js";
import shortid from "shortid";

export const UrlController = async (req, res) => {
  const long_url = req.body.long_url;
  const generatedCode = shortid.generate();

  // Use the environment variable, or fallback to localhost for development
  const baseUrl = process.env.BASE_URL || "http://localhost:2000";
  const shortUrl = `${baseUrl}/${generatedCode}`; // <-- UPDATED LINE

  //save to database

  const newUrl = new UrlModel({ generatedCode, long_url });
  await newUrl.save();

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const generatedCode = req.params.generatedCode;
  //find on database
  const OriginalUrl = await UrlModel.findOne({ generatedCode });

  if (OriginalUrl) {
    res.redirect(OriginalUrl.long_url);
  } else {
    res.json({
      message: "invalid shortener",
    });
  }
};
