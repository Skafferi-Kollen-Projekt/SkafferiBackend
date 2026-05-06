import { date, z } from "zod";
import { StorageLocation, AmountStatus } from "@prisma/client";

export const getPantryItemsSchema = z
  .object({
    location: z.nativeEnum(StorageLocation),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    expiresInDays: z.coerce.number().int().min(1).max(100).optional(),
  })
  .strict();

export const createPantryItemSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters long"),

    location: z.nativeEnum(StorageLocation),

    categoryId: z.number().int().positive().optional(),

    expiryDate: z.coerce
      .date()
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date >= today;
        },
        {
          message: "Expiry date cannot be in the past",
        },
      )
      .optional(),
  })
  .strict();

export const updatePantryItemSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters long")
      .optional(),
    amountStatus: z.nativeEnum(AmountStatus).optional(),
    quantity: z.number().positive().optional(),
    unit: z.string().trim().optional(),
    expiryDate: z.coerce
      .date()
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date >= today;
        },
        {
          message: "Expiry date cannot be in the past",
        },
      )
      .optional(),
    location: z.nativeEnum(StorageLocation).optional(),
    categoryId: z.number().int().positive().optional(),
  })
  .strict();
