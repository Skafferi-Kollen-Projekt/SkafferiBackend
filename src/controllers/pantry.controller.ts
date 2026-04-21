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
