import express from "express";
import {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion
} from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", protect, getQuestions);
router.post("/add", protect, addQuestion);
router.put("/:id", protect, updateQuestion);
router.delete("/:id", protect, deleteQuestion);

export default router;
