import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

// * ONLY ADMIN
router.get("/", restrictTo("ADMIN"), getAllUsersController);
router.delete("/:id", restrictTo("ADMIN"), deleteUserByIdController);

// * LOGGED IN USER or ADMIN
router.get("/:id", getUserByIdController);
router.patch("/:id", updateUserByIdController);

export default router;
