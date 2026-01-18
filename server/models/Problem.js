import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one category is required",
      },
    },
    link: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    timeSpent: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for efficient queries
problemSchema.index({ userId: 1, date: -1 });

export default mongoose.model("Problem", problemSchema);
