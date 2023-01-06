import { Router } from "express";
import {
  loginUser,
  loginWithGoogle,
  randomUser,
  registerUser,
} from "../controllers/userController";

const userRoute = Router();

userRoute
  .post("/login", loginUser)
  .post("/register", registerUser)
  .post("/random", randomUser)
  .post("/google", loginWithGoogle);

export { userRoute };
