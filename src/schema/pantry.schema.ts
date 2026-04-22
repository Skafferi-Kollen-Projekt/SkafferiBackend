import { z } from "zod";
import { StorageLocation, AmountStatus } from "@prisma/client";

export const getPantryItemsSchema = z.object({
  location: z.nativeEnum(StorageLocation),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  expiresInDays: z.coerce.number().min(1).max(100).default(20),
});

export const createPantryItemSchema = z.object({
  input: z.string().trim().min(1),
  location: z.nativeEnum(StorageLocation),
  categoryId: z.number().int().positive().optional(),
  expiryDate: z.string().datetime().optional(),
});

export const updatePantryItemSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    amountStatus: z.nativeEnum(AmountStatus).optional(),
    quantity: z.number().positive().optional(),
    unit: z.string().trim().optional(),
    expiryDate: z.coerce.date().optional(),
    location: z.nativeEnum(StorageLocation).optional(),
    categoryId: z.number().int().positive().optional(),
  })
  .strict();
