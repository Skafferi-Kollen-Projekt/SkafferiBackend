import { z } from "zod";
import { StorageLocation, AmountStatus } from "@prisma/client";

export const getPantryItemsSchema = z.object({
  location: z.nativeEnum(StorageLocation),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const createPantryItemSchema = z.object({
  input: z.string().min(1),
  location: z.nativeEnum(StorageLocation),
  categoryId: z.number().optional(),
  expiryDate: z.string().datetime().optional(),
});

export const updatePantryStatusSchema = z.object({
  status: z.nativeEnum(AmountStatus),
});
