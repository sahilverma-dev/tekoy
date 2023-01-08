import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import axios from "axios";
import { User } from "../models/userModel";
import { Types } from "mongoose";

const loginUser = async (req: Request, res: Response) => {
  // Find user with matching email
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  if (user.authProvider === "Email/Password") {
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

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      authProvider: user.authProvider,
      avatar: user.avatar,
      verified: user.verified,
    };

    // Generate JWT and send it as a response
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.send({
      message: "Login successful",
      user: payload,
      token,
    });
  } else {
    res.status(400).send({
      message: "Email Used by other Auth Provider",
    });
  }
};

const registerUser = async (req: Request, res: Response) => {
  // Destructure email, password, and name from request body
  const { email, password, name } = req.body;

  // Find user with matching email
  const existingUser = await User.findOne({ email });

  // If user is found
  if (existingUser) {
    // Check if user was created with Email/Password auth provider
    if (existingUser?.authProvider === "Email/Password") {
      // Send error response with message indicating email is already in use
      res.status(400).json({
        error: "Email Already Used",
      });
    } else {
      // Send error response with message indicating email is already in use by other auth provider
      res.status(400).json({
        message: "Email Already Used by other Auth Provider",
      });
    }
  } else {
    // Hash the password
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "Email/Password",
    });

    if (newUser) {
      const payload = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        authProvider: newUser.authProvider,
        avatar: newUser.avatar,
        verified: newUser.verified,
      };

      // Generate a JWT for the new user
      const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: "1d",
      });

      // Send the response with the user data and JWT
      res.status(200).json({
        user: payload,
        token,
        message: "New user Created",
      });
    }
  }
};

const randomUser = async (req: Request, res: Response) => {
  try {
    // Get user data from the randomuser.me API
    const { data } = await axios("https://randomuser.me/api?results=1");

    // Create new user
    const newUser = await User.create({
      name: `${data?.results[0]?.name?.first} ${data?.results[0]?.name?.last}`,
      email: data?.results[0]?.email,
      authProvider: "Random",
      avatar: data?.results[0]?.picture?.large,
      verified: false,
      password: data?.results[0]?.login?.password,
    });
    if (newUser) {
      // Generate JWT for the new user
      const payload = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        authProvider: newUser.authProvider,
        avatar: newUser.avatar,
        verified: newUser.verified,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: "1d",
      });

      // Send response with user data and JWT
      res.status(200).json({
        user: payload,
        token,
        message: "New user generated",
      });
    } else {
      // Send response error
      res.status(200).json({
        user: null,
        token: null,
        message: "Failed to generate new user",
      });
    }
  } catch (error: any) {
    console.log(error.message.red);
    res.status(500).send({
      error: error.message,
    });
  }
};

const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { id, name, email, avatar } = req.body;

    // Check if user with provided email already exists
    const user = await User.findOne({ email });
    if (user) {
      // Create a payload with the user's name, email, id, avatar, and authProvider
      const payload = {
        name: user.name,
        email: user.email,
        id: user._id,
        avatar: user.avatar,
        authProvider: user.authProvider,
      };

      // Sign a JWT with the payload and secret key
      const token = jwt.sign(payload, process.env.JWT_SECRET || "");

      // Send a response with the user's data and JWT
      res.send({
        user: payload,
        token,
      });
    } else {
      // If user with provided id does not exist, create a new user with the provided id

      const newUser = await User.create({
        name,
        authProvider: "Google",
        password: id,
        email,
        avatar,
      });

      if (newUser) {
        // Create a payload with the user's name, email, id, avatar, and authProvider
        const payload = {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id,
          avatar: newUser.avatar,
          authProvider: newUser.authProvider,
        };

        // Sign a JWT with the payload and secret key
        const token = jwt.sign(payload, process.env.JWT_SECRET || "");

        // Send a response with the user's data and JWT
        res.send({
          user: newUser,
          token,
        });
      }
    }
  } catch (error: any) {
    console.log(error.message.red);
    res.send({
      error: error.message,
    });
  }
};

export { loginUser, registerUser, randomUser, loginWithGoogle };
