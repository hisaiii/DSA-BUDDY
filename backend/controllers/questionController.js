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
export const updateQuestion = async (req, res) => {
    try {
        const updatedQ = await Question.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },  // only user’s own
            req.body,
            { new: true }
        );
        if (!updatedQ) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(updatedQ);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
