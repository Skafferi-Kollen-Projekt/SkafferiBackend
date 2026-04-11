import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { success } from "zod";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: "USER" | "ADMIN";
      };
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Access denied. Invalid or expired token." });
  }
};

export const restrictTo = (...roles: ("USER" | "ADMIN")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Forbidden. You do not have permission to perform this action.",
      });
    }
    next();
  };
};
