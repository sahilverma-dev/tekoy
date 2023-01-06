import { Document, model, Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  authProvider: "Google" | "Email/Password" | "Random";
  verified: boolean;
  avatar?: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authProvider: {
      type: String,
      required: true,
      enum: ["Google", "Email/Password", "Random"],
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User = model<User & Document>("User", userSchema);
