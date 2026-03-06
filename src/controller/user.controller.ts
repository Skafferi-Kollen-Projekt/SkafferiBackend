import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.services";
import { CreateUserTypeZ } from "../models/user.model";

export const createUser = async (
  req: Request<{}, {}, CreateUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newUser = await userService.createUser(data);
    if (!newUser) {
      return res.status(500).json({ msg: "Failed to create user" });
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const changeUser = await userService.updateById(id, req.body);
    if (!changeUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(changeUser);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const removeUser = await userService.deleteById(id);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
