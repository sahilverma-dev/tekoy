import { Document, model, Schema } from "mongoose";

export interface BugType {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const bugSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  message: { type: String, required: [true, "Message is required"] },
  createdAt: { type: Date, default: Date.now },
});

export const Bug = model<BugType & Document>("Bug", bugSchema);
