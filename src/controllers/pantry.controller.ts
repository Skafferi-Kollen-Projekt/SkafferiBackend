import { Request, Response, NextFunction } from "express";
import {
  createPantryItemSchema,
  updatePantryItemSchema,
  getPantryItemsSchema,
} from "../schema/pantry.schema";
import {
  getPantryItemByLocationService,
  createPantryItemService,
  updatePantryItemService,
  deletePantryItemService,
} from "../services/pantry.service";

// * Get pantry items by location
export const getPantryItemsByLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const query = getPantryItemsSchema.parse(req.query);

    const result = await getPantryItemByLocationService({
      userId,
      location: query.location,
      page: query.page,
      limit: query.limit,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// * CREATE PANTRY ITEM
export const createPantryItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const body = createPantryItemSchema.parse(req.body);
    const item = await createPantryItemService({
      userId,
      name: body.input,
      location: body.location,
      categoryId: body.categoryId,
      expiryDate: body.expiryDate,
    });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// * UPDATE PANTRY ITEM
export const updatePantryItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const itemId = Number(req.params.id);
    const body = updatePantryItemSchema.parse(req.body);

    await updatePantryItemService({
      userId,
      itemId,
      update: body,
    });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// * DELETE PANTRY ITEM
export const deletePantryItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const itemId = Number(req.params.id);
    await deletePantryItemService({
      userId,
      itemId,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
