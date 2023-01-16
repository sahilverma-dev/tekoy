import { Document, model, Schema } from "mongoose"

interface Room {
  title: string;
  thumbnail: string;
  category: string;
  user: object;
  created_at: Date
}

const roomSchema = new Schema(
  {
    title: String,
    thumbnail: String,
    category: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
  }
)

export const Room = model<Room & Document>("Room", roomSchema)
