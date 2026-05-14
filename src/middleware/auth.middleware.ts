import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { AppError } from "../utils/app.error.js";

type JwtPayload = {
  id: string | number;
  email: string;
  role: Role;
};

const COOKIE_NAME = "access_token";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

   
    if (typeof req.cookies?.[COOKIE_NAME] === "string") {
      token = req.cookies[COOKIE_NAME];
    }

    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return next(new AppError("Access denied. No token provided.", 401));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

   
    const userId = Number(decoded.id);

    if (!Number.isInteger(userId)) {
      return next(new AppError("Invalid token payload.", 401));
    }

    req.user = {
      id: userId, 
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    return next(new AppError("Access denied. Invalid or expired token.", 401));
  }
};

export const restrictTo =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Forbidden. You do not have permission to perform this action.",
          403,
        ),
      );
    }
    next();
  };
