import { Router } from "express";
import { addBug, getAll } from "../controllers/bugController";

const bugRoute = Router();

bugRoute.post("/add", addBug).get("/all", getAll);

export { bugRoute };
