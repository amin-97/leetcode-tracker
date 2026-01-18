import mongoose from "mongoose";

const dailyGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    problemsPerDay: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
      default: 1,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("DailyGoal", dailyGoalSchema);
