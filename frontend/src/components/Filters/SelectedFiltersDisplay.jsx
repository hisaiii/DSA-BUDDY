import React from "react";
import { FaTimes } from "react-icons/fa";

const SelectedFiltersDisplay = ({ 
  selectedTopics, 
  selectedPlatforms, 
  onRemoveTopic, 
  onRemovePlatform 
}) => {
  const isActive = selectedTopics.length > 0 || selectedPlatforms.length > 0;

  if (!isActive) return null;

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold mb-2 text-white">Selected Filters</h4>
      <div className="flex flex-wrap gap-2">
        {selectedTopics.map((topic) => (
          <div 
            key={topic} 
            className="flex items-center bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
          >
            <span>{topic}</span>
            <button 
              onClick={() => onRemoveTopic(topic)} 
              className="ml-2 hover:text-red-400"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        ))}

        {selectedPlatforms.map((platform) => (
          <div 
            key={platform} 
            className="flex items-center bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm"
          >
            <span>{platform}</span>
            <button 
              onClick={() => onRemovePlatform(platform)} 
              className="ml-2 hover:text-red-400"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedFiltersDisplay;
