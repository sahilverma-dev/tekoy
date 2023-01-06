import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/UserModel";

const loginUser = async (req: Request, res: Response) => {
  // Find user with matching email
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  // Compare provided password with user's hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({
      error: "Incorrect password",
    });
  }

  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = "my-secret";
  }

  // Generate JWT and send it as a response
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );
  res.send({
    message: "Login successful",
    token,
  });
};

export { loginUser };
