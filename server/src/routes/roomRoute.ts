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
  .get("/all", getRooms)
  .get("/:roomId", authenticateUser, getRoom)
  .post("/create", authenticateUser, createRoom)
  .patch("/:roomId/edit", authenticateUser, updateRoom)
  .delete("/:roomId/delete", authenticateUser, deleteRoom);

export { roomRoute };
