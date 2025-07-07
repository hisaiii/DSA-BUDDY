import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    questionName: { type: String, required: true },
    questionLink: { type: String },
    whatWentWrong: { type: String },
    whatLearnt: { type: String },
    topics: [{ type: String }],
    platform: { type: String },
    markForReview: { type: Boolean, default: false },
    importance: {
      type: String,
      enum: ["very important", "important", "basic"],
      default: "basic",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
