import { Router } from "express";
import {
  createSupportMessageController,
  getSupportMessagesForAdminController,
} from "../controllers/support.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

/*USER*/
router.post("/", protect, createSupportMessageController);

/*Admin*/
router.get(
  "/admin",
  protect,
  restrictTo("ADMIN"),
  getSupportMessagesForAdminController,
);

export default router;
