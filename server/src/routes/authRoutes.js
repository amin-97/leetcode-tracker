import express from "express";
import passport from "../config/passport.js";
import {
  googleCallback,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback,
);

// Get current user (protected)
router.get("/me", authMiddleware, getCurrentUser);

// Logout
router.post("/logout", logout);

export default router;
