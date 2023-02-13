import { Request, Response } from "express";
import { Bug } from "../models/BugModel";

const addBug = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const newBug = new Bug({
    name,
    email,
    message,
  });
  await newBug.save();
  res.status(200).json({
    newBug,
  });
};

const getAll = async (req: Request, res: Response) => {
  try {
    const bugs = await Bug.find({});
    res.status(200).json({
      bugs,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

export { addBug, getAll };
