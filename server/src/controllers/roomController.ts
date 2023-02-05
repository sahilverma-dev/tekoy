import { Request, Response } from "express";
import { Room, RoomType } from "../models/RoomModel";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { title, thumbnail } = req.body;
    const newRoom = await Room.create({
      title,
      thumbnail,
      user: req.body.user?.id,
    });
    res.send({
      message: "room created",
      room: newRoom,
      // user: req.body.user,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
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
    res.status(200).json({
      rooms: rooms?.map((room) => ({
        id: room._id,
        title: room.title,
        thumbnail: room.thumbnail,
        listeners: room.listeners,
        createdAt: room.createdAt,
      })),
    });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { title, thumbnail } = req.body;
    const room = await Room.findById(roomId);
    if (room) {
      if (room.user.toString() === req.body.user.id) {
        // check if user is owner of room
        const newRoom = await Room.findByIdAndUpdate(
          roomId,
          {
            title,
            thumbnail,
          },
          { new: true }
        );
        if (newRoom)
          res.status(200).json({
            message: "room updated",
            room: {
              id: newRoom._id,
              title: newRoom.title,
              thumbnail: newRoom.thumbnail,
              user: newRoom.user,
              listeners: newRoom.listeners,
              createdAt: newRoom.createdAt,
            },
          });
        else
          res.status(400).json({
            message: "Something went wrong",
          });
      } else {
        res.status(400).json({
          message: "You are not the owner of the room",
        });
      }
    } else {
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await Room.findById(roomId);

  if (room) {
    if (room.user.toString() === req.body.user.id) {
      // check if user is owner of room
      await Room.findByIdAndDelete(roomId);
      res.status(200).json({ message: "Room deleted" });
    } else {
      res.status(400).json({ message: "You are not the owner of the room" });
    }
  } else {
    res.status(404).json({ message: "Room Not Found" });
  }
};
