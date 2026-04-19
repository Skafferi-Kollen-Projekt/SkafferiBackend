import { z } from "zod";
import { StorageLocation, AmountStatus } from "@prisma/client";

export const createPantryItemSchema = z.object({
  input: z.string().min(1, "Input is required"),
  location: z.nativeEnum(StorageLocation),
  categoryId: z.number().optional(),
  expiryDate: z.string().datetime().optional(),
});

export const updatePantryStatusSchema = z.object({
  status: z.nativeEnum(AmountStatus),
});
