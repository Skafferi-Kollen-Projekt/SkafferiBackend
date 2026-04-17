import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../controller/auth.controller.js";
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

export default router;
