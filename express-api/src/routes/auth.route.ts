import express from "express";
import * as authController from "../controllers/auth.controller";
import { validateLogin } from "../middleware/validators/authValidators";
// /api/v1/auth
const router = express.Router();

router.post("/login", validateLogin, authController.login);

router.get("/logout", authController.logout);

export default router;
