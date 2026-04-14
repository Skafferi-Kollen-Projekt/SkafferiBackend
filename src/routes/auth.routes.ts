import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../controller/auth.controller.js";

const router = Router();

// * REGISTER A NEW USER
router.post("/register", registerUserController);

// * LOGIN AN EXISTING USER
router.post("/login", loginUserController);

export default router;
