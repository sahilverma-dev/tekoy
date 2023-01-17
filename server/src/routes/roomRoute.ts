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
  .post("/create-room", authenticateUser, createRoom)
  .get("/get-room/:roomId", authenticateUser, getRoom)
  .get("/get-rooms", getRooms)
  .post("/update-room", authenticateUser, updateRoom)
  .post("/delete-room", authenticateUser, deleteRoom);

export { roomRoute };
