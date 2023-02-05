import { Document, model, Schema } from "mongoose";
import { IUser } from "../interfaces";

export interface RoomType {
  title: string;
  thumbnail: string;
  user: IUser;
  listeners: IUser[];
  createdAt: Date;
}

const roomSchema = new Schema({
  title: { type: String, required: [true, "Room title is required"] },
  thumbnail: { type: String, required: [true, "Room thumbnail is required"] },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Room user is required"],
  },
  listeners: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Room = model<RoomType & Document>("Room", roomSchema);
