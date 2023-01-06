import { Router } from "express";
import { loginUser } from "../controllers/userController";

const userRoute = Router();

userRoute.post("/login", loginUser);

export { userRoute };
