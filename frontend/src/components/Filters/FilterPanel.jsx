// src/components/Filters/FilterPanel.jsx
import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import BasicFilters from "./BasicFilters";
import PlatformFilter from "./PlatformFilter";
import TopicFilter from "./TopicFilter";
import DateRangeFilter from "./DateRangeFilter";
import SelectedFiltersDisplay from "./SelectedFiltersDisplay";
import MarkForReview from "./MarkForReview";
const FilterPanel = ({
  filters,
  filterHandlers,
  hasActiveFilters,
  clearFilters,
  availableTopics,
  availablePlatforms,

}) => {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount =
    Object.entries(filters).filter(([key, value]) => {
      if (key === 'selectedTopics' || key === 'selectedPlatforms') {
        return value.length > 0;
      }
      return value !== "";
    }).length;

  return (
    <div className="bg-[#252525] rounded-lg p-6 mb-6 border border-[#404040]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaFilter className="text-blue-400" />
          <h2 className="text-xl font-semibold">Filters</h2>
          {hasActiveFilters && (
            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
        >
          {showFilters ? "Hide" : "Show"} Filters
        </button>
      </div>

      {showFilters && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PlatformFilter
              selectedPlatforms={filters.selectedPlatforms}
              availablePlatforms={availablePlatforms}
              onPlatformSelect={filterHandlers.handlePlatformSelect}
            />

            <BasicFilters
              filters={filters}
              onFilterChange={filterHandlers.handleFilterChange}
            />

            <TopicFilter
              selectedTopics={filters.selectedTopics}
              availableTopics={availableTopics}
              onTopicSelect={filterHandlers.handleTopicSelect}
            />

            <DateRangeFilter
              filters={filters}
              onFilterChange={filterHandlers.handleFilterChange}
            />

            <MarkForReview
              filters={filters}
              onFilterChange={filterHandlers.handleFilterChange}
            />
          </div>

          <SelectedFiltersDisplay
            selectedTopics={filters.selectedTopics}
            selectedPlatforms={filters.selectedPlatforms}
            onRemoveTopic={filterHandlers.removeSelectedTopic}
            onRemovePlatform={filterHandlers.removeSelectedPlatform}
          />

          <div className="flex gap-3 mt-6">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <FaTimes className="text-sm" />
                Clear All Filters
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;