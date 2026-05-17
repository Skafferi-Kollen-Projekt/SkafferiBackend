import { prisma } from "../config/db.js";
import { AppError } from "../utils/app.error.js";

export const createSupportMessageService = async (
  userId: number,
  message: string,
) => {
  if (!message || message.trim().length === 0) {
    throw new AppError("Message cannot be empty", 400);
  }

  const messageMessage = await prisma.supportMessage.create({
    data: {
      message,
      userId,
    },
  });

  return messageMessage;
};

export const getSupportMessageForAdminService = async () => {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const messages = await prisma.supportMessage.findMany({
    where: {
      created_at: {
        gte: twoDaysAgo,
      },
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  return messages;
};
