// src/components/Filters/BasicFilters.jsx
import React from "react";

const MarkForReview = ({ filters = {}, onFilterChange }) => {
  const markForReview = filters.markForReview || "";

  return (
    <div>
     
      
      <label className="block text-sm  text-slate-300 mb-2">Review Status</label>
      <select
        value={markForReview}
        onChange={(e) => onFilterChange && onFilterChange("markForReview", e.target.value)}
        className="w-full bg-[#1F1F1F] border cursor-pointer border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
      >
        <option value="">All Questions</option>
        <option value="true">Marked for Review</option>
        <option value="false">Not Marked for Review</option>
      </select>
    </div>
  );
};

export default MarkForReview;