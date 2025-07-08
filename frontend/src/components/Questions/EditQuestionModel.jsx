// src/components/Questions/EditQuestionModal.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditQuestionModal = ({ question, onClose, onQuestionUpdated }) => {
  const [form, setForm] = useState({
    questionName: question.questionName || "",
    questionLink: question.questionLink || "",
    whatWentWrong: question.whatWentWrong || "",
    whatLearnt: question.whatLearnt || "",
    topics: question.topics.join(", ") || "",
    platform: question.platform || "",
    markForReview: question.markForReview || false,
    importance: question.importance || "basic",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    if (!form.questionName.trim()) {
      toast.error("Question name is required");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://dsa-buddy.onrender.com/api/v1/questions/${question._id}`,
        {
          ...form,
          topics: form.topics.split(",").map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Question updated!");
      onQuestionUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating question:", err);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#2A2A2A] p-6 rounded-lg w-[500px] max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-white">Edit Question</h2>

        {[{ name: "questionName", placeholder: "Question Name" },
          { name: "questionLink", placeholder: "Question Link" },
          { name: "whatWentWrong", placeholder: "What Went Wrong" },
          { name: "whatLearnt", placeholder: "What You Learnt" },
          { name: "topics", placeholder: "Topics (comma separated)" },
          { name: "platform", placeholder: "Platform" }
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded bg-[#1F1F1F] border border-gray-600 text-white"
          />
        ))}

        <div className="mb-3">
          <label className="text-white mr-3">Mark for Review:</label>
          <input
            type="checkbox"
            name="markForReview"
            checked={form.markForReview}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="text-white block mb-1">Importance:</label>
          <select
            name="importance"
            value={form.importance}
            onChange={handleChange}
            className="w-full p-2 bg-[#1F1F1F] border border-gray-600 text-white rounded"
          >
            <option value="basic">basic</option>
            <option value="important">important</option>
            <option value="very important">very important</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
