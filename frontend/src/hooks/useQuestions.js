// src/hooks/useQuestions.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllQuestions();
  }, []);

const fetchAllQuestions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:8000/api/v1/questions/get`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Sort by createdAt (newest first)
    const sortedQuestions = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setAllQuestions(sortedQuestions);
    setQuestions(sortedQuestions);
  } catch (err) {
    console.error("Error fetching questions", err);
  } finally {
    setLoading(false);
  }
};

  const toggleReview = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const updatedQuestions = questions.map((q) =>
        q._id === id ? { ...q, markForReview: !q.markForReview } : q
      );
      setQuestions(updatedQuestions);

      const updatedAllQuestions = allQuestions.map((q) =>
        q._id === id ? { ...q, markForReview: !q.markForReview } : q
      );
      setAllQuestions(updatedAllQuestions);

      await axios.put(
        `http://localhost:8000/api/v1/questions/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Failed to toggle review:", error);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/v1/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setQuestions(questions.filter((q) => q._id !== id));
      setAllQuestions(allQuestions.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return {
    questions,
    allQuestions,
    loading,
    setQuestions,
    deleteQuestion,
    toggleReview,
    fetchAllQuestions
  };
};