import { Router } from "express";
import {
  getPantryItemsByLocation,
  createPantryItem,
  updatePantryItemStatus,
  deletePantryItem,
} from "../controllers/pantry.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

// * Get pantry items by location = Frys, Skafferi, Kylskåp
router.get("/", getPantryItemsByLocation);

// * Create a new pantry item
router.post("/", createPantryItem);

// * Update pantry item status (e.g., mark as used or expired)
router.patch("/:id/status", updatePantryItemStatus);

// * Delete a pantry item
router.delete("/:id", deletePantryItem);

export default router;
