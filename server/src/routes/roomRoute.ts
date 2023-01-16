import { Router } from "express"
import { authenticateuser } from "../middleware/auth"
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom
} from "../controllers/roomController"

const roomRoute = Router()

roomRoute
  .post("/create-room", authenticateuser, createRoom)
  .get("/get-room/:roomId", authenticateuser, getRoom)
  .get("/get-rooms", getRooms)
  .post("/update-room", authenticateuser, updateRoom)
  .post("/delete-room", authenticateuser, deleteRoom)

export { roomRoute };