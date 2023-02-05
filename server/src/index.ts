import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "colors";

import { connectDB } from "./config/db";

// importing routes
import { userRoute } from "./routes/userRoute";
import { roomRoute } from "./routes/roomRoute";

// configure dotenv
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);
app.use(express.json());

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
app.use("/api/v1/rooms", roomRoute);
console.clear();

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
