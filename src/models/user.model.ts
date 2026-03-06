import { z } from "zod";

// export type UserRole = "admin" | "user";

export const createUserValidation = z.object({
  body: z.object({
    firstname: z.string("Please enter a valid name").min(2),
    lastname: z.string("Please enter a valid last name").min(2),
    email: z.email("Please enter a valid email"),
    password: z.string("Please enter a valid password").min(8),
  }),
});
export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];

// export const registerUserValidation = createUserValidation.extend({
//   body: createUserValidation.shape.body.extend({
//     password: z.string("Please enter a valid password").min(8),
//   }),
// });

// export const loginUserValidation = z.object({
//   body: z.object({
//     email: z.email("Please enter a valid email..."),
//     password: z.string("Please enter a valid password...").min(8),
//   }),
// });

// export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];
// export type RegisterUserTypeZ = z.infer<typeof registerUserValidation>["body"];
// export type LoginUserTypeZ = z.infer<typeof loginUserValidation>["body"];

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     age: { type: Number, required: true },
//     password: { type: String, required: true, select: false },
//     role: { type: String, enum: ["admin", "user"], default: "user" },
//   },
//   { timestamps: true },
// );

// export const UserModel = mongoose.model<UserDocument>("User", userSchema);
