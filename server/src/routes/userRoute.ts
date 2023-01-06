import { Router } from "express";
import {
  loginUser,
  randomUser,
  registerUser,
} from "../controllers/userController";

const userRoute = Router();

userRoute
  .post("/login", loginUser)
  .post("/register", registerUser)
  .post("/random", randomUser);

export { userRoute };
