import jwt from "jsonwebtoken";

export const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || "");
