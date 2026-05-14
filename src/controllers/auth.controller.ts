import type { Request, Response, NextFunction } from "express";
import type { RegisterUserTypeZ, LoginUserTypeZ } from "../schema/auth.schema";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";
import { success } from "zod";
import { AppError } from "../utils/app.error";

const COOKIE_NAME = "access_tooken";

const setAuthCookie = (res: Response, token: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dagar
  });
};

const clearAuthCookie = (res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });
};

// * REGISTER A NEW USER
export const registerUserController = async (
  req: Request<{}, {}, RegisterUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const newUser = await registerUserService(data);

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to register user",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    if (!data?.email || !data?.password) {
      return next(new AppError("Invalid email or password", 401));
    }

    const result = await loginUserService({
      email: data.email,
      password: data.password,
    });

    setAuthCookie(res, result.token);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req: Request, res: Response) => {
  clearAuthCookie(res);

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
