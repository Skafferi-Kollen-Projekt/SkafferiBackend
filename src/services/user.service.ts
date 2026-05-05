import { prisma } from "../config/db.js";
import { Role } from "@prisma/client";
import { AppError } from "../utils/app.error.js";
import { UpdateUserTypeZ } from "../schema/auth.schema.js";
import bcrypt from "bcrypt";
const userSelect = {
  id: true,
  firstname: true,
  lastname: true,
  email: true,
  role: true,
  created_at: true,
  updated_at: true,
};

// * Get all users
export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: userSelect,
  });
  return users;
};

// * Get user by id
export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

// * Update user by id
export const updateuserByIdService = async (
  id: number,
  data: UpdateUserTypeZ,
) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  const hashedpassword = data.password
    ? await bcrypt.hash(data.password, 10)
    : undefined;
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedpassword,
    },
    select: userSelect,
  });

  return updatedUser;
};

// * Delete user by id
export const deleteUserByIdService = async (id: number) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const deleteduser = await prisma.user.delete({
    where: { id },
    select: { id: true, email: true },
  });
  return deleteduser;
};
