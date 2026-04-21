import { Request, Response, NextFunction } from "express";
import {
  createPantryItemSchema,
  updatePantryStatusSchema,
  getPantryItemsSchema,
} from "../schema/pantry.schema";
import {
  getPantryItemByLocationService,
  createPantryItemService,
  updatePantryItemStatusService,
  deletePantryItemService,
} from "../services/pantry.service";
import { prisma } from "../config/db.js";

// * Get pantry items by location
export const getPantryItemsByLocation = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const parsed = getPantryItemsSchema.parse(req.query);

  const result = await getPantryItemByLocationService({
    userId,
    location: parsed.location,
    page: parsed.page,
    limit: parsed.limit,
  });

  res.status(200).json(result);
};

// * CREATE PANTRY ITEM
export const createPantryItem = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const parsed = createPantryItemSchema.parse(req.body);

  const item = await createPantryItemService({
    userId,
    name: parsed.input,
    location: parsed.location,
    categoryid: parsed.categoryId,
    expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : undefined,
  });
  res.status(201).json(item);
};

// * UPDATE PANTRY ITEM STATUS
export const updatePantryItemStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const data = updatePantryStatusSchema.parse(req.body);

  const updatedItem = await prisma.pantryItem.update({
    where: { id },
    data,
  });
  res.status(200).json(updatedItem);
};

// * DELETE PANTRY ITEM
export const deletePantryItem = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const itemId = Number(req.params.id);

  await deletePantryItemService({
    userId,
    itemId,
  });

  res.status(204).send();
};
