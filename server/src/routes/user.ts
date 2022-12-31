import { Router } from "express";
import { loginUser } from "../controllers/userControllers";

const userRoute = Router();

userRoute.post("/login", loginUser);

export { userRoute };
