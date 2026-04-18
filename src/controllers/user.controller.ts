import { Request, Response, NextFunction } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  updateuserByIdService,
  deleteUserByIdService,
} from "../services/user.service";

// * GET ALL USERS
export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// * GET USER BY ID
export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// * UPDATE USER BY ID
export const updateUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await updateuserByIdService(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// * DELETE USER BY ID
export const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await deleteUserByIdService(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
