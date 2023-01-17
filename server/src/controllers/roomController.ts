import { Request, Response } from "express";
import { Room } from "../models/RoomModel";

export const createRoom = async (req: Request, res: Response) => {
  const { title, thumbnail, userId } = req.body;
  if (!title || !thumbnail || !userId) {
    res.status(400).json({
      message: "Enter all felids",
    });
  } else {
    const room = await Room.create({
      title,
      thumbnail,
      user: userId,
    });
    if (room) {
      res.status(200).json({ room });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
};

export const getRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await Room.findById(roomId);
  if (room) {
    res.status(200).json({ room });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const rooms = await Room.find();
  if (rooms) {
    res.status(200).json({ rooms });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const { roomId, roomTitle, roomThumbnail, roomCategory, userId } = req.body;
  const room = await Room.findById(roomId);
  if (room) {
    if (room.user.toString() === userId) {
      // check if user is owner of room
      const newRoom = await Room.findByIdAndUpdate(
        roomId,
        { title: roomTitle, thumbnail: roomThumbnail, category: roomCategory },
        { new: true }
      );
      res.status(200).json({ room: newRoom });
    } else {
      res.status(400).json({ message: "You are not the owner of the room" });
    }
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { roomId, userId } = req.body;
  const room = await Room.findById(roomId);

  if (room) {
    if (room.user.toString() === userId) {
      // check if user is owner of room
      await Room.findByIdAndDelete(roomId);
      res.status(200).json({ message: "Room deleted" });
    } else {
      res.status(400).json({ message: "You are not the owner of the room" });
    }
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
