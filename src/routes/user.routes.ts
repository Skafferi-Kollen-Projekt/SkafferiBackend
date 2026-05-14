import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  updateMeController,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateUserValidation } from "../schema/auth.schema.js";

const router = Router();

router.use(protect);

// * ONLY ADMIN
router.get("/", restrictTo("ADMIN"), getAllUsersController);

router.patch("/me", validate(updateUserValidation), updateMeController);

// * LOGGED IN USER or ADMIN
router.get("/:id", getUserByIdController);

router.patch("/:id", validate(updateUserValidation), updateUserByIdController);

router.delete("/:id", deleteUserByIdController);

export default router;
