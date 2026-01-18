import { validationResult } from "express-validator";
import Problem from "../models/Problem.js";

// Get all problems for current user
export const getProblems = async (req, res) => {
  try {
    const userId = req.user.id;
    const problems = await Problem.find({ userId }).sort({ date: -1 });

    res.json(problems);
  } catch (error) {
    console.error("Get problems error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get problems by date
export const getProblemsByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.params;

    const problems = await Problem.find({ userId, date });

    res.json(problems);
  } catch (error) {
    console.error("Get problems by date error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create problem
export const createProblem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { name, difficulty, categories, link, notes, date, timeSpent } =
      req.body;

    const problem = await Problem.create({
      userId,
      name,
      difficulty,
      categories,
      link,
      notes,
      date,
      timeSpent,
    });

    res.status(201).json(problem);
  } catch (error) {
    console.error("Create problem error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update problem
export const updateProblem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { id } = req.params;
    const { name, difficulty, categories, link, notes, date, timeSpent } =
      req.body;

    const problem = await Problem.findOne({ _id: id, userId });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Update fields
    if (name !== undefined) problem.name = name;
    if (difficulty !== undefined) problem.difficulty = difficulty;
    if (categories !== undefined) problem.categories = categories;
    if (link !== undefined) problem.link = link;
    if (notes !== undefined) problem.notes = notes;
    if (date !== undefined) problem.date = date;
    if (timeSpent !== undefined) problem.timeSpent = timeSpent;

    await problem.save();

    res.json(problem);
  } catch (error) {
    console.error("Update problem error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete problem
export const deleteProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const problem = await Problem.findOneAndDelete({ _id: id, userId });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    console.error("Delete problem error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
