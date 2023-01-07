import express, { json } from "express";
import dotenv from "dotenv";
import "colors";
// importing routes
import { userRoute } from "./routes/userRoute";
import { connectDB } from "./config/db";

// configuration
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(json());

// connecting database
connectDB();

// using routes
app.get("/", (req, res) => {
  res.send("listening");
});
app.use("/api/v1/user", userRoute);

console.clear();

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
