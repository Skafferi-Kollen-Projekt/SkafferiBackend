import { prisma } from "../config/db.js";
import { StorageLocation, AmountStatus } from "@prisma/client";
import { AppError } from "../utils/app.error.js";
import { string } from "zod";

// * GET PRODUCT PER LOCATION
export const getPantryItemByLocationService = async (data: {
  userId: number;
  location: StorageLocation;
  page?: number;
  limit?: number;
}) => {
  const page = data.page ?? 1;
  const limit = data.limit ?? 20;
  const skip = (page - 1) * limit;

  const [items, total] = await prisma.$transaction([
    prisma.pantryItem.findMany({
      where: {
        userId: data.userId,
        location: data.location,
      },
      orderBy: [{ amountStatus: "asc" }, { created_at: "desc" }],
      skip,
      take: limit,
    }),
    prisma.pantryItem.count({
      where: {
        userId: data.userId,
        location: data.location,
      },
    }),
  ]);
  const now = new Date();

  const itemsWithExpiryInfo = items.map((item) => {
    if (!item.expiryDate) {
      return { ...item, expiryInfo: null };
    }

    const daysLeft = Math.ceil(
      (item.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      ...item,
      expiryInfo: {
        daysLeft,
        isExpired: daysLeft < 0,
        isExpiringSoon: daysLeft >= 0 && daysLeft <= 3,
        isWarning: daysLeft > 3 && daysLeft <= 7,
      },
    };
  });

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// * CREATE A NEW PANTRY ITEM IN ACTIVE LOCATION
export const createPantryItemService = async (data: {
  userId: number;
  name: string;
  location: StorageLocation;
  categoryId?: number;
  expiryDate?: Date;
}) => {
  if (!data.name.trim()) {
    throw new AppError("Product name is required", 400);
  }

  return prisma.pantryItem.create({
    data: {
      name: data.name,
      location: data.location,
      categoryId: data.categoryId,
      expiryDate: data.expiryDate,
      userId: data.userId,
    },
  });
};

// * UPDATE THE STATUS OF A PANTRY ITEM FEAT: FAST UPDATE
export const updatePantryItemService = async (data: {
  userId: number;
  itemId: number;
  update: {
    name?: string;
    amountStatus?: AmountStatus;
    quantity?: number;
    unit?: string;
    expiryDate?: Date;
    location?: StorageLocation;
    categoryId?: number;
  };
}) => {
  const result = await prisma.pantryItem.updateMany({
    where: {
      id: data.itemId,
      userId: data.userId,
    },
    data: data.update,
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
