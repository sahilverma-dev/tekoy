import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const userRoute = Router();

userRoute.post("/login", loginUser).post("/register", registerUser);

export { userRoute };
