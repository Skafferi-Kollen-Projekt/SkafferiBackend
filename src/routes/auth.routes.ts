import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  registerUserValidation,
  loginUserValidation,
} from "../schema/auth.schema.js";


const router = Router();

router.post(
  "/register",
  validate(registerUserValidation),
  registerUserController,
);

router.post("/login", validate(loginUserValidation), loginUserController);

router.post("/logout", logoutUserController);
export default router;
