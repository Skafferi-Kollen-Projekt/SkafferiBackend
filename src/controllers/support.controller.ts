import { Request, Response, NextFunction } from "express";
import {
  createSupportMessageService,
  getSupportMessageForAdminService,
} from "../services/support.service";

export const createSupportMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message } = req.body;

    const supportMessage = await createSupportMessageService(
      req.user.id,
      message,
    );

    res.status(201).json(supportMessage);
  } catch (error) {
    next(error);
  }
};

export const getSupportMessagesForAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messages = await getSupportMessageForAdminService();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
