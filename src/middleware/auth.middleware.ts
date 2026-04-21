import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { success } from "zod";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string | number;
      email: string;
      role: Role;
    };

    req.user = {
      id: Number(decoded.id),
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied. Invalid or expired token." });
  }
};

export const restrictTo =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        messgage:
          "Forbidden. You do not have permission to perform this action.",
      });
    }
    next();
  };
