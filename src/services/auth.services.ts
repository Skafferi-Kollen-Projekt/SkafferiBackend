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

// *  LOGIN AN EXISTING USER
export const loginUserService = async (data: LoginUserTypeZ) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const tokenOptions: SignOptions = {
    expiresIn: "1d",
  };

  const token = jwt.sign(
    tokenPayload,
    process.env.JWT_SECRET as string,
    tokenOptions,
  );

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
