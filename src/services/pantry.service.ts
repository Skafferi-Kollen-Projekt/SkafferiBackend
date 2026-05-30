import { prisma } from "../config/db.js";
import { StorageLocation, AmountStatus } from "@prisma/client";
import { AppError } from "../utils/app.error.js";
import { string } from "zod";
import id from "zod/v4/locales/id.js";

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const itemsWithExpiryInfo = items.map((item) => {
    if (!item.expiryDate) {
      return { ...item, expiryInfo: null };
    }

    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      ...item,
      expiryInfo: {
        daysLeft,
        isExpired: daysLeft < 0,
        isExpiringSoon: daysLeft >= 0 && daysLeft <= 2,
        isWarning: daysLeft >= 0 && daysLeft <= 5,
      },
    };
  });
  const totalPages = Math.ceil(total / limit);
  return {
    items: itemsWithExpiryInfo,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
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

  if (data.categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new AppError("Category not found", 404);
    }
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
  isAdmin?: boolean;
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
  const { userId, itemId, update, isAdmin } = data;

  const where: {
    id: number;
    userId?: number;
  } = {
    id: itemId,
  };

  if (!isAdmin) {
    where.userId = userId;
  }

  const existingItem = await prisma.pantryItem.findFirst({
    where,
  });

  if (!existingItem) {
    throw new AppError("Product not found", 404);
  }

  if (update.categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: update.categoryId },
    });

    if (!categoryExists) {
      throw new AppError("Category not found", 404);
    }
  }

  const updatedItem = await prisma.pantryItem.update({
    where: { id: itemId },
    data: {
      ...(update.name !== undefined && { name: update.name }),
      ...(update.amountStatus !== undefined && {
        amountStatus: update.amountStatus,
      }),
      ...(update.quantity !== undefined && { quantity: update.quantity }),
      ...(update.unit !== undefined && { unit: update.unit }),
      ...(update.expiryDate !== undefined && { expiryDate: update.expiryDate }),
      ...(update.location !== undefined && { location: update.location }),
      ...(update.categoryId !== undefined && { categoryId: update.categoryId }),
    },
    select: {
      id: true,
      name: true,
      amountStatus: true,
      quantity: true,
      unit: true,
      expiryDate: true,
      location: true,
      categoryId: true,
      created_at: true,
      updated_at: true,
    },
  });
  return updatedItem;
};

// * DELETE A PANTRY ITEM
export const deletePantryItemService = async (data: {
  userId: number;
  itemId: number;
  isAdmin?: boolean;
}) => {
  const { userId, itemId, isAdmin = false } = data;

  const where: {
    id: number;
    userId?: number;
  } = {
    id: itemId,
  };

  if (!isAdmin) {
    where.userId = userId;
  }

  const existingItem = await prisma.pantryItem.findFirst({
    where,
  });

  if (!existingItem) {
    throw new AppError("Product not found", 404);
  }

  await prisma.pantryItem.delete({
    where: { id: itemId },
  });
};
