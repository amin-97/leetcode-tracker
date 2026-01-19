import User from "../models/User.js";
import DailyGoal from "../models/DailyGoal.js";
import { generateToken } from "../utils/jwt.js";

// Cookie options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// Google OAuth callback
export const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}?error=auth_failed`);
    }

    // Check if daily goal exists, create if not
    const dailyGoal = await DailyGoal.findOne({ userId: user._id.toString() });
    if (!dailyGoal) {
      await DailyGoal.create({
        userId: user._id.toString(),
        problemsPerDay: 1,
        enabled: true,
      });
    }

    // Generate token
    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    // Set HTTP-only cookie
    res.cookie("token", token, getCookieOptions());

    // Redirect to frontend
    res.redirect(`${process.env.CLIENT_URL}/auth/callback`);
  } catch (error) {
    console.error("Google callback error:", error);
    res.redirect(`${process.env.CLIENT_URL}?error=server_error`);
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout - clear cookie
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
