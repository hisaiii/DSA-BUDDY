import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const QuestionsHeader = ({ onAddQuestion }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left Section: Title */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-bold">
          📚 DSA Buddy
        </h1>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex items-center gap-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 bg-red-600 cursor-pointer text-white rounded-full hover:bg-red-700 transition"
          title="Logout"
        >
          <FaSignOutAlt size={16} />
        </button>

        {/* Add Question Button */}
        {onAddQuestion && (
          <button
            onClick={onAddQuestion}
            className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionsHeader;
