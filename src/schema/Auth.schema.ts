import { z } from "zod";

// * Validation for creating a new user account
export const registerUserValidation = z.object({
  body: z
    .object({
      firstname: z
        .string()
        .min(4, "First name must be at least 4 characters long"),
      lastname: z
        .string()
        .min(4, "Last name must be at least 4 characters long"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    })
    .strict(),
});

// * Validation for logging in an existing user
export const loginUserValidation = z.object({
  body: z
    .object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    })
    .strict(),
});

export type RegisterUserTypeZ = z.infer<typeof registerUserValidation>["body"];
export type LoginUserTypeZ = z.infer<typeof loginUserValidation>["body"];
