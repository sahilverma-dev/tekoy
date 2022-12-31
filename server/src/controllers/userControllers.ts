import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/userModel";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, name, avatar, authProvider } = req.body;
    // Check if email exists in database
    const user = await User.findOne({ email });

    const payload = {
      email,
      name,
      avatar,
      authProvider,
    };

    const secret: any = process.env.JWT_SECRET; // Replace with your own secret key

    const options = {
      expiresIn: "1d", // Token will expire in 1 day
    };

    const token = jwt.sign(payload, secret, options);
    if (user) {
      // Email exists, return user data
      return res.status(200).json({
        message: "Login SuccessFul",
        user,
        token,
      });
    } else {
      // Email does not exist, create new user
      const newUser: IUser = new User({
        email,
        name,
        avatar,
        authProvider,
      });
      await newUser.save();

      return res.status(201).json({
        message: "New user created",
        user: newUser,
        token,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
