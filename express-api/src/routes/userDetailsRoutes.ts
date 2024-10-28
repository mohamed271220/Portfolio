import express from "express";
import {
  getUserDetails,
  updateUserDetails,
} from "../controllers/userDetailsController";
import { authenticateToken } from "../middleware/auth.middleware";
import { userDetailsValidationRules } from "../middleware/validators/userDetailsValidators";

const router = express.Router();

router.get("/", getUserDetails); // Public route to get user details
router.patch(
  "/",
  authenticateToken,
  userDetailsValidationRules,
  updateUserDetails
); // Protected route to update user details

export default router;
