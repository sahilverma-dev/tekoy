import { Document, model, Schema } from "mongoose";

interface Room {
  title: string;
  thumbnail: string;
  category: string;
  user: object;
  createdAt: Date;
}

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Room = model<Room & Document>("Room", roomSchema);
