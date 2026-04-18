import type { Request, Response, NextFunction } from "express";
import { RegisterUserTypeZ, LoginUserTypeZ } from "../schema/auth.schema";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";
import { success } from "zod";
import { AppError } from "../utils/app.error";

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

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: result.token,
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};
