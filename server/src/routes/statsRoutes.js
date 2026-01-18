import express from "express";
import { body } from "express-validator";
import {
  getStats,
  getDailyGoal,
  updateDailyGoal,
} from "../controllers/statsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Get user statistics
router.get("/", getStats);

// Get daily goal
router.get("/goal", getDailyGoal);

// Update daily goal
router.put(
  "/goal",
  [
    body("problemsPerDay")
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage("Problems per day must be between 1 and 20"),
    body("enabled")
      .optional()
      .isBoolean()
      .withMessage("Enabled must be a boolean"),
  ],
  updateDailyGoal,
);

export default router;
