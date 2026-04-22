import { Router } from "express";
import {
  getPantryItemsByLocationController,
  createPantryItemController,
  updatePantryItemController,
  deletePantryItemController,
} from "../controllers/pantry.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

// * Get pantry items by location = Frys, Skafferi, Kylskåp
router.get("/", getPantryItemsByLocationController);

// * Create a new pantry item
router.post("/", createPantryItemController);

// * Update pantry item status (e.g., mark as used or expired)
router.patch("/:id/", updatePantryItemController);

// * Delete a pantry item
router.delete("/:id", deletePantryItemController);

export default router;
