import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "colors";

// importing routes
import { userRoute } from "./routes/user";
import { connectDB } from "./config/db";

// configure dotenv
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("listening");
});

console.clear();

app.listen(PORT, () => {
  console.log(`Listing on the port ${PORT}`);
});

// connecting to database
connectDB();

// using routes
app.use("/api/v1/user", userRoute);
