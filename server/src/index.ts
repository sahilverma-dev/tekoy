import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "colors";
// importing routes
import { userRoute } from "./routes/userRoute";
import { roomRoute } from "./routes/roomRoute";
import { connectDB } from "./config/db";

// configuration
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);

app.use(json());

// connecting database
connectDB();

// using routes
app.get("/", (req, res) => {
  res.send("listening");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);
console.clear();

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
