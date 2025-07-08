import React from "react";
import {
  FaStar,
  FaTrash,
  FaEdit,
  FaEllipsisV,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuestionsTable = ({
  questions,
  allQuestions,
  loading,
  hasActiveFilters,
  deleteQuestion,
  toggleReview,
  selectedTopics,
  selectedPlatforms,
  setSelectedQuestion,
  setShowEditModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(null);
  const navigate = useNavigate();

  const getImportanceColor = (level) => {
    switch (level.toLowerCase()) {
      case "basic":
        return "text-green-400";
      case "important":
        return "text-yellow-400";
      case "very important":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="relative overflow-visible min-h-[400px] pb-16">
      {loading ? (
        <div className="text-center animate-pulse text-slate-400 text-lg py-12">
          Loading questions...
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center text-slate-500 text-lg py-12">
          {hasActiveFilters
            ? "No questions match your filters"
            : "No questions tracked yet! 🚀"}
        </div>
      ) : (
        <>
          <div className="mb-4 text-slate-400">
            <p>
              Showing {questions.length} of {allQuestions.length} question
              {questions.length !== 1 ? "s" : ""}
              {hasActiveFilters && " (filtered)"}
            </p>
          </div>
            <div className=" shadow-md border border-[#444]">

          <table className="w-full border-collapse text-base rounded-xl overflow-visible bg-[#252525]">
            <thead>
              <tr className="bg-[#333333] text-left text-[#E0E0E0] text-lg font-semibold border-b border-[#444]">
                <th className="p-4">No.</th>
                <th className="p-4">Name</th>
                <th className="p-4">Platform</th>
                <th className="p-4">Mistake</th>
                <th className="p-4">Lesson</th>
                <th className="p-4">Topics</th>
                <th className="p-4">Importance</th>
                <th className="p-4">Revise</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr
                  key={q._id}
                  className="hover:bg-[#3A3A3A] transition-all last:pb-16"
                >
                  <td className="p-4 border-b border-[#3A3A3A]">{index + 1}</td>
                  <td className="p-4 border-b border-[#3A3A3A]">
                    <a
                      href={q.questionLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-yellow-300 hover:underline"
                    >
                      {q.questionName}
                    </a>
                  </td>
                  <td className="p-4 border-b border-[#3A3A3A]">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        selectedPlatforms.includes(q.platform)
                          ? "bg-green-600/40 text-green-100 border border-green-400"
                          : "bg-green-600/30 text-green-200"
                      }`}
                    >
                      {q.platform}
                    </span>
                  </td>
                  <td className="p-4 border-b border-[#3A3A3A] text-white">
                    {q.whatWentWrong}
                  </td>
                  <td className="p-4 border-b border-[#3A3A3A] text-white">
                    {q.whatLearnt}
                  </td>
                  <td className="p-4 border-b border-[#3A3A3A]">
                    <div className="flex flex-wrap gap-1">
                      {q.topics.map((topic, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded text-sm ${
                            selectedTopics.includes(topic)
                              ? "bg-purple-600/40 text-purple-100 border border-purple-400"
                              : "bg-purple-500/30 text-purple-200"
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className={`p-4 border-b border-[#3A3A3A] ${getImportanceColor(
                      q.importance
                    )}`}
                  >
                    {q.importance}
                  </td>
                  <td className="p-4 border-b border-[#3A3A3A] text-center">
                    <button
                      onClick={() => toggleReview(q._id)}
                      className="text-xl focus:outline-none transition-colors duration-200 hover:scale-110"
                    >
                      <FaStar
                        className={
                          q.markForReview
                            ? "text-yellow-400"
                            : "text-slate-400"
                        }
                      />
                    </button>
                  </td>
                  <td className="p-4 border-b border-[#3A3A3A] text-center relative">
                    <div className="relative inline-block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(q._id);
                        }}
                        className="p-2 hover:bg-[#404040] rounded-full transition-all duration-200"
                      >
                        <FaEllipsisV className="text-slate-400 hover:text-slate-200" />
                      </button>
                      {dropdownOpen === q._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-[#2A2A2A] border border-[#404040] rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => {
                              setSelectedQuestion(q);
                              setShowEditModal(true);
                              setDropdownOpen(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-blue-400 hover:bg-[#3A3A3A] flex items-center gap-2"
                          >
                            <FaEdit className="text-xs" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteQuestion(q._id);
                              setDropdownOpen(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#3A3A3A] flex items-center gap-2"
                          >
                            <FaTrash className="text-xs" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionsTable;