import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app.error.js";
import { LoginUserTypeZ, RegisterUserTypeZ } from "../schema/Auth.schema.js";
import { SignOptions } from "jsonwebtoken";

// * C - CREATE - REGISTER A NEW USER
export const registerUserService = async (data: RegisterUserTypeZ) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  // * PASSWORD - HASHING - SECRURITY
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
      created_at: true,
    },
  });
  return newUser;
};
