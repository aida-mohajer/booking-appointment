import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../custom-request";
import { TokenBlacklistService } from "../token-blacklist.service";

dotenv.config();

// const tokenBlacklistService = new TokenBlacklistService();

export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // const secret = process.env.JWT_SECRET;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.status(500).json({
      message: "Internal Server Error: JWT Secret not configured. ",
    });
  }
  try {
    // Check if token is blacklisted
    // if (tokenBlacklistService.isBlacklisted(token)) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized (blacklisted token)" });
    // }

    const decoded = jwt.verify(token, secret) as { id: number; role: string };
    if (!decoded) {
      return { error: "Token is invalid" };
    }
    // req.user = { userId: (decoded as any).id };
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
