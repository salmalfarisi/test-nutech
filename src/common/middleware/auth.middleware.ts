import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("SIGN SECRET:", process.env.JWT_SECRET);

  if (!authHeader) {
    return res.status(401).json({ status:108, data: null, message: "Token tidak valid atau kadaluwarsa" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SECRET_KEY"
    );

    req.user = decoded; // attach payload to request

    next();
  } catch (err) {
    return res.status(401).json({ status:108, data: null, message: "Token tidak valid atau kadaluwarsa" });
  }
};