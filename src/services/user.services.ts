import { AppError } from "../utils/app.error";
import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { CreateUserTypeZ } from "../models/user.model";

export const createUser = async (data: CreateUserTypeZ) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("An user with that email already exist", 409);
  }

  //*encrypt password
  const hashedPassword = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    },
  });
};

export const getAllUsers = async () => {
  const users = prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      created_at: true,
    },
  });

  return users;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      created_at: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateById = async (id: number, data: CreateUserTypeZ) => {
  const updateUser = await prisma.user.update({
    where: { id: id },
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    },
  });
  if (!updateUser) {
    throw new AppError("User not found", 404);
  }

  return updateUser;
};

export const deleteById = async (id: number) => {
  const deleteUser = await prisma.user.delete({
    where: { id: id },
  });

  if (!deleteUser) {
    throw new AppError("User not found or already deleted", 404);
  }

  return deleteUser;
};
