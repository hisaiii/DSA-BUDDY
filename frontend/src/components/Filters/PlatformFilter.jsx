// src/components/Filters/PlatformFilter.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown, FaCheck } from "react-icons/fa";

const PlatformFilter = ({ selectedPlatforms = [], availablePlatforms = [], onPlatformSelect }) => {
  const [platformSearchTerm, setPlatformSearchTerm] = useState("");
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const platformDropdownRef = useRef(null);

  // Filter platforms based on search term
  const filteredPlatforms = availablePlatforms.filter((platform) =>
    platform.toLowerCase().includes(platformSearchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(event.target)) {
        setShowPlatformDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={platformDropdownRef}>
      <label className="block text-sm mb-2 text-slate-300">Platforms</label>
      <div
        className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white cursor-pointer focus:border-blue-400 min-h-[42px] flex items-center justify-between"
        onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
      >
        <span className={selectedPlatforms.length > 0 ? "text-white" : "text-slate-400"}>
          {selectedPlatforms.length > 0 
            ? `${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''} selected`
            : "Select platforms"
          }
        </span>
        <FaChevronDown className={`text-slate-400 transition-transform ${showPlatformDropdown ? 'rotate-180' : ''}`} />
      </div>
      
      {showPlatformDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#2A2A2A] border border-[#404040] rounded-lg shadow-lg z-20 max-h-64 overflow-hidden">
          {/* Search Bar */}
          <div className="p-3 border-b border-[#404040]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search platforms..."
                value={platformSearchTerm}
                onChange={(e) => setPlatformSearchTerm(e.target.value)}
                className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg pl-10 pr-3 py-2 text-white text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Platforms List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredPlatforms.length > 0 ? (
              filteredPlatforms.map((platform) => (
                <div
                  key={platform}
                  className="flex items-center px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer"
                  onClick={() => onPlatformSelect(platform)}
                >
                  <div className="flex items-center justify-center w-4 h-4 mr-3">
                    {selectedPlatforms.includes(platform) && (
                      <FaCheck className="text-blue-400 text-xs" />
                    )}
                  </div>
                  <span className="text-white text-sm">{platform}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-slate-400 text-sm">
                No platforms found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformFilter;