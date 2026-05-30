import { z } from "zod";

// * Validation for creating a new user account
export const registerUserValidation = z.object({
  body: z
    .object({
      firstname: z
        .string()
        .min(2, "First name must be at least 2 characters long"),
      lastname: z
        .string()
        .min(2, "Last name must be at least 2 characters long"),
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
      email: z.string().email("Wrong email format"),
      password: z.string("Wrong password").min(8, "8 characters required"),
    })
    .strict(),
});

export const updateUserValidation = z.object({
  body: z
    .object({
      firstname: z
        .string()
        .min(2, "First name must be at least 2 characters long")
        .optional(),
      lastname: z
        .string()
        .min(2, "Last name must be at least 2 characters long")
        .optional(),
      email: z.string().email("Invalid email address").optional(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .optional(),
    })
    .strict(),
});

export type RegisterUserTypeZ = z.infer<typeof registerUserValidation>["body"];
export type LoginUserTypeZ = z.infer<typeof loginUserValidation>["body"];
export type UpdateUserTypeZ = z.infer<typeof updateUserValidation>["body"];
