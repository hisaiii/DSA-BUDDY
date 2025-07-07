import React from "react";

const QuestionCard = ({ question }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{question.questionName}</h2>
        <a
          href={question.questionLink}
          target="_blank"
          rel="noreferrer"
          className="text-purple-600 text-sm hover:underline"
        >
          Open
        </a>
      </div>
      <p className="text-xs mb-1">
        <strong>What went wrong:</strong> {question.whatWentWrong}
      </p>
      <p className="text-xs mb-1">
        <strong>What learnt:</strong> {question.whatLearnt}
      </p>
      <p className="text-xs mb-1">
        <strong>Topics:</strong> {question.topics.join(", ")}
      </p>
      <p className="text-xs mb-1">
        <strong>Platform:</strong> {question.platform}
      </p>
      <p className="text-xs mb-1">
        <strong>Importance:</strong> {question.importance}
      </p>
      {question.markForReview && (
        <span className="inline-block bg-yellow-300 text-xs px-2 py-1 rounded mt-2">
          Marked for Review
        </span>
      )}
    </div>
  );
};

export default QuestionCard;
