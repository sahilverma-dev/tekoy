import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("listening");
});

console.clear();

app.listen(PORT, () => {
  console.log(`Listing on the port ${PORT}`);
});
