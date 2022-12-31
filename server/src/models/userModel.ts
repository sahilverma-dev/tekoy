import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  authProvider: "Google" | "Email/Password" | "Random";
  verified?: boolean;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name must be less than 20 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      // unique: [true, 'Email already exists'],
    },
    authProvider: {
      type: String,
      required: [true, "Auth provider is required"],
      enum: ["Google", "Email/Password", "Random"],
    },
    verified: {
      type: Boolean,
    },
    avatar: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("Users", userSchema);
