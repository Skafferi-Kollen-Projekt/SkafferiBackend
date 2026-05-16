import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  updateMeController,
  getMeController,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateUserValidation } from "../schema/auth.schema.js";

const router = Router();

router.use(protect);

router.get("/me", getMeController);

// admin
router.get("/", restrictTo("ADMIN"), getAllUsersController);

// id‑routes
router.get("/:id", getUserByIdController);
router.patch("/:id", validate(updateUserValidation), updateUserByIdController);
router.delete("/:id", deleteUserByIdController);

export default router;
