import User from '../models/User.js'
import Question from '../models/Question.js'

//get ques with filter query
export const getQuestions = async (req, res) => {
  try {
    const { platform, importance, topic, markForReview } = req.query;

    let filter = { user: req.user.id };

    if (platform) filter.platform = platform;
    if (importance) filter.importance = importance;
    if (markForReview) filter.markForReview = markForReview === "true";
    if (topic) filter.topics = topic;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//add ques
export const addQuestion = async (req, res) => {
    try {
        const {
            questionName,
            questionLink,
            whatWentWrong,
            whatLearnt,
            topics,
            platform,
            markForReview,
            importance
        } = req.body;

        const newQ = await Question.create({
            questionName,
            questionLink,
            whatWentWrong,
            whatLearnt,
            topics,
            platform,
            markForReview,
            importance,
            user: req.user.id
        });

        res.status(201).json(newQ);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



//update ques 
// questionController.js
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });

    // toggle-only update
    if (Object.keys(req.body).length === 0) {
      question.markForReview = !question.markForReview;
      await question.save();
      return res.json({
        message: "Toggled review status",
        markForReview: question.markForReview,
      });
    }

    // proper updates
    const {
      questionName,
      questionLink,
      whatWentWrong,
      whatLearnt,
      importance,
      topics,
      platform,
      markForReview,
    } = req.body;

    if (questionName !== undefined) question.questionName = questionName;
    if (questionLink !== undefined) question.questionLink = questionLink;
    if (whatWentWrong !== undefined) question.whatWentWrong = whatWentWrong;
    if (whatLearnt !== undefined) question.whatLearnt = whatLearnt;
    if (importance !== undefined) question.importance = importance;
    if (topics !== undefined) question.topics = topics;
    if (platform !== undefined) question.platform = platform;
    if (markForReview !== undefined) question.markForReview = markForReview; // ✅ FIX HERE

    await question.save();
    res.json({ message: "Question updated", question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



//delete ques
export const deleteQuestion = async (req, res) => {
    try {
        const deletedQ = await Question.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!deletedQ) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


