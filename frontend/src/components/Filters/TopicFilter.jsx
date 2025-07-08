// src/components/Filters/TopicFilter.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown, FaCheck } from "react-icons/fa";

const TopicFilter = ({ selectedTopics, availableTopics, onTopicSelect }) => {
  const [topicSearchTerm, setTopicSearchTerm] = useState("");
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const topicDropdownRef = useRef(null);

  // Filter topics based on search term
  const filteredTopics = availableTopics.filter((topic) =>
    topic.toLowerCase().includes(topicSearchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (topicDropdownRef.current && !topicDropdownRef.current.contains(event.target)) {
        setShowTopicDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={topicDropdownRef}>
      <label className="block text-sm mb-2 text-slate-300">Topics</label>
      <div
        className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white cursor-pointer focus:border-blue-400 min-h-[42px] flex items-center justify-between"
        onClick={() => setShowTopicDropdown(!showTopicDropdown)}
      >
        <span className={selectedTopics.length > 0 ? "text-white" : "text-slate-400"}>
          {selectedTopics.length > 0 
            ? `${selectedTopics.length} topic${selectedTopics.length > 1 ? 's' : ''} selected`
            : "Select topics"
          }
        </span>
        <FaChevronDown className={`text-slate-400 transition-transform ${showTopicDropdown ? 'rotate-180' : ''}`} />
      </div>
      
      {showTopicDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#2A2A2A] border border-[#404040] rounded-lg shadow-lg z-20 max-h-64 overflow-hidden">
          {/* Search Bar */}
          <div className="p-3 border-b border-[#404040]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search topics..."
                value={topicSearchTerm}
                onChange={(e) => setTopicSearchTerm(e.target.value)}
                className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg pl-10 pr-3 py-2 text-white text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Topics List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer"
                  onClick={() => onTopicSelect(topic)}
                >
                  <div className="flex items-center justify-center w-4 h-4 mr-3">
                    {selectedTopics.includes(topic) && (
                      <FaCheck className="text-blue-400 text-xs" />
                    )}
                  </div>
                  <span className="text-white text-sm">{topic}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-slate-400 text-sm">
                No topics found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicFilter;