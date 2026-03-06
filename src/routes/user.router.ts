import { Router } from "express";
import {
  createUser,
  deleteById,
  getAllUser,
  updateById,
} from "../controller/user.controller"; // ! createuser later imprt
import { getUserById } from "../controller/user.controller";
// import { deleteById } from "../controller/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";
// import { protect, restrictTo } from "../middleware/auth.middleware";

const userRoutes = Router();

userRoutes.post("/", validate(createUserValidation), createUser);
userRoutes.get("/", getAllUser);
userRoutes.get("/:id", getUserById);
userRoutes.patch("/:id", updateById);
userRoutes.delete("/:id", deleteById);

export default userRoutes;
