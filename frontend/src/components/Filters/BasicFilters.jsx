// src/components/Filters/BasicFilters.jsx
import React from "react";

const BasicFilters = ({ filters = {}, onFilterChange }) => {
  // Provide default values to prevent undefined errors
  const importance = filters.importance || "";
  const markForReview = filters.markForReview || "";

  return (
    <div>
      <label className="block text-sm mb-2 text-slate-300">Importance</label>
      <select
        value={importance}
        onChange={(e) => onFilterChange && onFilterChange("importance", e.target.value)}
        className="w-full bg-[#1F1F1F] cursor-pointer border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
      >
        <option value="">All Importance Levels</option>
        <option value="basic">Basic</option>
        <option value="important">Important</option>
        <option value="very important">Very Important</option>
      </select>
      

    </div>
  );
};

export default BasicFilters;