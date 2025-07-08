// src/components/Filters/DateRangeFilter.jsx
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DateRangeFilter = ({ filters = {}, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onFilterChange) {
      onFilterChange(name, value);
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Date Range Filter */}
      <div>
        <label className="block text-sm mb-2 text-slate-300">
          <FaCalendarAlt className="inline mr-2" />
          Date Range
        </label>
        <select
          value={filters.dateRange || ""}
          onChange={(e) => handleFilterChange("dateRange", e.target.value)}
          className="w-full cursor-pointer bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="thisYear">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === "custom" && (
        <>
          <div>
            <label className="block text-sm mb-2 text-slate-300">Start Date</label>
            <input
              type="date"
              value={filters.customStartDate || ""}
              onChange={(e) => handleFilterChange("customStartDate", e.target.value)}
              className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-slate-300">End Date</label>
            <input
              type="date"
              value={filters.customEndDate || ""}
              onChange={(e) => handleFilterChange("customEndDate", e.target.value)}
              className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangeFilter;