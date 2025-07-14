import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const AddQuestionModal = ({ onClose, onQuestionAdded }) => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    questionName: "",
    questionLink: "",
    whatWentWrong: "",
    whatLearnt: "",
    topics: "",
    platform: "",
    markForReview: false,
    importance: "basic",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    if (!form.questionName) {
      toast.error("Question Name is required!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://dsa-buddy-1je4.onrender.com/api/v1/questions/add",
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

      toast.success("Question added successfully!");
      onQuestionAdded(res.data);
      onClose();
    } catch (err) {
      console.error("Error adding question:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#2A2A2A] p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Add New Question</h2>

        {[
          { name: "questionName", placeholder: "Question Name" },
          { name: "questionLink", placeholder: "Question Link" },
          { name: "whatWentWrong", placeholder: "What Went Wrong" },
          { name: "whatLearnt", placeholder: "What You Learnt" },
          { name: "topics", placeholder: "Topics (comma separated)" },
          { name: "platform", placeholder: "Platform (e.g. LeetCode)" },
        ].map(({ name, placeholder }) =>
          ["whatWentWrong", "whatLearnt"].includes(name) ? (
            <textarea
              key={name}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              rows={4}
              className="w-full mb-3 p-2 rounded bg-[#1F1F1F] border border-gray-600 text-white resize-y"
            />
          ) : (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-[#1F1F1F] border border-gray-600 text-white"
            />
          )
        )}

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
            <option>basic</option>
            <option>important</option>
            <option>very important</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
