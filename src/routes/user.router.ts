import { Router } from "express";
import { createUser, getAllUser } from "../controller/user.controller";
import { getUserById, updateById } from "../controller/user.controller";
import { deleteById } from "../controller/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.post("/", validate(createUserValidation), createUser);
router.get("/", protect, restrictTo("admin"), getAllUser);
router.get("/:id", getUserById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
