import { prisma } from "../config/db.js";
import { StorageLocation, AmountStatus } from "@prisma/client";
import { AppError } from "../utils/app.error.js";

// * GET PRODUCT PER LOCATION
export const getPantryItemByLocationService = async (
  location: StorageLocation,
  userId: number,
) => {
  return prisma.pantryItem.findMany({
    where: {
      userId,
      location,
    },
    orderBy: [{ amountStatus: "asc" }, { created_at: "desc" }],
  });
};

// * CREATE A NEW PANTRY ITEM IN ACTIVE LOCATION
export const createPantryItemService = async (data: {
  userId: number;
  name: string;
  location: StorageLocation;
  categoryid?: number;
  expiryDate?: Date;
}) => {
  if (!data.name.trim()) {
    throw new AppError("Product name is required", 400);
  }

  return prisma.pantryItem.create({
    data: {
      name: data.name,
      location: data.location,
      categoryId: data.categoryid,
      expiryDate: data.expiryDate,
      userId: data.userId,
    },
  });
};

// * UPDATE THE STATUS OF A PANTRY ITEM FEAT: FAST UPDATE
export const updatePantryItemStatusService = async (data: {
  userId: number;
  itemId: number;
  status: AmountStatus;
}) => {
  const result = await prisma.pantryItem.updateMany({
    where: {
      id: data.itemId,
      userId: data.userId,
    },
    data: {
      amountStatus: data.status,
    },
  });

  if (result.count === 0) {
    throw new AppError("Product not found", 404);
  }
};

// * DELETE A PANTRY ITEM
export const deletePantryItemService = async (data: {
  userId: number;
  itemId: number;
}) => {
  const result = await prisma.pantryItem.deleteMany({
    where: {
      id: data.itemId,
      userId: data.userId,
    },
  });
  if (result.count === 0) {
    throw new AppError("Product not found", 404);
  }
};
