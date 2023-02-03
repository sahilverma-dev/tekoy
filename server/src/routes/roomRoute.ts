import { Router } from "express";
import { authenticateUser } from "../middleware/auth";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/roomController";

const roomRoute = Router();

roomRoute
  .post("/create", authenticateUser, createRoom)
  .get("/:roomId", authenticateUser, getRoom)
  .get("/all", getRooms)
  .patch("/update", authenticateUser, updateRoom)
  .delete("/delete/:roomId", authenticateUser, deleteRoom);

export { roomRoute };
