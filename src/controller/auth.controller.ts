import type { Request, Response, NextFunction } from "express";
import { RegisterUserTypeZ, LoginUserTypeZ } from "../schema/Auth.schema";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.services.js";
import { success } from "zod";

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

// * LOGIN AN EXISTING USER
export const loginUserController = async (
  req: Request<{}, {}, LoginUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const result = await loginUserService(data);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
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
