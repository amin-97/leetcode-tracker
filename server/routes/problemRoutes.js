import express from "express";
import { body } from "express-validator";
import {
  getProblems,
  getProblemsByDate,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Get all problems
router.get("/", getProblems);

// Get problems by date
router.get("/date/:date", getProblemsByDate);

// Create problem
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Problem name is required"),
    body("difficulty")
      .isIn(["Easy", "Medium", "Hard"])
      .withMessage("Invalid difficulty"),
    body("categories")
      .isArray({ min: 1 })
      .withMessage("At least one category is required"),
    body("date").isISO8601().withMessage("Invalid date format"),
  ],
  createProblem,
);

// Update problem
router.put(
  "/:id",
  [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Problem name cannot be empty"),
    body("difficulty")
      .optional()
      .isIn(["Easy", "Medium", "Hard"])
      .withMessage("Invalid difficulty"),
    body("categories")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one category is required"),
    body("date").optional().isISO8601().withMessage("Invalid date format"),
  ],
  updateProblem,
);

// Delete problem
router.delete("/:id", deleteProblem);

export default router;
