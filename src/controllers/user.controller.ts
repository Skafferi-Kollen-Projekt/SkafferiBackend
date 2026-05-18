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
    const requestUserId = Number(req.params.id);
    const loggedInUser = req.user;

    if (loggedInUser.role !== "ADMIN" && loggedInUser.id !== requestUserId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }
    const user = await getUserByIdService(requestUserId);

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
    const requestUserid = Number(req.params.id);
    const loggedInUser = req.user;

    if (loggedInUser.role !== "ADMIN" && loggedInUser.id !== requestUserid) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this user" });
    }

    const updatedUser = await updateuserByIdService(requestUserid, req.body);

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
    const requestedUserId = Number(req.params.id);
    const loggedInUser = req.user;

    if (loggedInUser.role !== "ADMIN" && loggedInUser.id !== requestedUserId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this user" });
    }

    await deleteUserByIdService(requestedUserId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUser = req.user;

    const updatedUser = await updateuserByIdService(loggedInUser.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// * GET LOGGED IN USER (ME)
export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUser = req.user;

    const user = await getUserByIdService(loggedInUser.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUser = req.user;
    const { email } = req.body;

    if (!email || email !== loggedInUser.email) {
      return res.status(400).json({
        message: "Email confirmation does not match logged in user",
      });
    }
    await deleteUserByIdService(loggedInUser.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
