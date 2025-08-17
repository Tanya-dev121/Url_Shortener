import express from "express";
import mongoose from "mongoose";
import { UrlController, getOriginalUrl } from "./controllers/UrlController.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, { dbName: "Nodejs" })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

//res,req give error
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

app.post("/short", UrlController);

//dynamic routing

app.get("/:generatedCode", getOriginalUrl);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
