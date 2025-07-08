// import React, { useEffect, useState, useContext, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   FaStar,
//   FaTrash,
//   FaEdit,
//   FaEllipsisV,
//   FaFilter,
//   FaTimes,
//   FaSearch,
//   FaChevronDown,
//   FaCheck,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import { UserContext } from "../context/UserContext";
// import { useUserAuth } from "../hooks/useUserAuth";

// const Questions = () => {
//   useUserAuth();
//   const { user } = useContext(UserContext);
//   const [questions, setQuestions] = useState([]);
//   const [allQuestions, setAllQuestions] = useState([]); // Store all questions for topic extraction
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     importance: "",
//     markForReview: "",
//     dateRange: "",
//     customStartDate: "",
//     customEndDate: "",
//   });
//   const [availableTopics, setAvailableTopics] = useState([]);
//   const [availablePlatforms, setAvailablePlatforms] = useState([]);

//   // Topic search related states
//   const [topicSearchTerm, setTopicSearchTerm] = useState("");
//   const [showTopicDropdown, setShowTopicDropdown] = useState(false);
//   const [selectedTopics, setSelectedTopics] = useState([]);
//   const topicDropdownRef = useRef(null);

//   // Platform search related states
//   const [platformSearchTerm, setPlatformSearchTerm] = useState("");
//   const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);
//   const platformDropdownRef = useRef(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllQuestions();
//   }, []);

//   // Fetch all questions initially to get all available topics
//   const fetchAllQuestions = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:5000/api/v1/questions/get`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setAllQuestions(response.data);
//       const topics = [...new Set(response.data.flatMap((q) => q.topics))].sort();
//       const platforms = [...new Set(response.data.map((q) => q.platform))].sort();
//       setAvailableTopics(topics);
//       setAvailablePlatforms(platforms);

//       // Apply filters to get filtered questions
//       applyFiltersToQuestions(response.data);
//     } catch (err) {
//       console.error("Error fetching questions", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to filter questions by date range
//   const filterByDateRange = (questions, dateRange, customStartDate, customEndDate) => {
//     if (!dateRange && !customStartDate && !customEndDate) return questions;

//     const now = new Date();
//     let startDate, endDate;

//     if (dateRange === "custom") {
//       if (customStartDate) startDate = new Date(customStartDate);
//       if (customEndDate) {
//         endDate = new Date(customEndDate);
//         endDate.setHours(23, 59, 59, 999); // End of day
//       }
//     } else {
//       switch (dateRange) {
//         case "today":
//           startDate = new Date(now);
//           startDate.setHours(0, 0, 0, 0);
//           endDate = new Date(now);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         case "yesterday":
//           startDate = new Date(now);
//           startDate.setDate(startDate.getDate() - 1);
//           startDate.setHours(0, 0, 0, 0);
//           endDate = new Date(now);
//           endDate.setDate(endDate.getDate() - 1);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         case "last7days":
//           startDate = new Date(now);
//           startDate.setDate(startDate.getDate() - 7);
//           startDate.setHours(0, 0, 0, 0);
//           endDate = new Date(now);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         case "last30days":
//           startDate = new Date(now);
//           startDate.setDate(startDate.getDate() - 30);
//           startDate.setHours(0, 0, 0, 0);
//           endDate = new Date(now);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         case "thisMonth":
//           startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//           endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         case "lastMonth":
//           startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//           endDate = new Date(now.getFullYear(), now.getMonth(), 0);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         case "thisYear":
//           startDate = new Date(now.getFullYear(), 0, 1);
//           endDate = new Date(now.getFullYear(), 11, 31);
//           endDate.setHours(23, 59, 59, 999);
//           break;
//         default:
//           return questions;
//       }
//     }

//     return questions.filter((q) => {
//       const questionDate = new Date(q.createdAt || q.dateCreated);
//       if (startDate && questionDate < startDate) return false;
//       if (endDate && questionDate > endDate) return false;
//       return true;
//     });
//   };

//   // Apply filters to the questions
//   const applyFiltersToQuestions = (questionsData = allQuestions, currentFilters = filters, currentSelectedTopics = selectedTopics, currentSelectedPlatforms = selectedPlatforms) => {
//     let filteredQuestions = [...questionsData];

//     // Apply platform filter (support multiple platforms)
//     if (currentSelectedPlatforms.length > 0) {
//       filteredQuestions = filteredQuestions.filter((q) =>
//         currentSelectedPlatforms.includes(q.platform)
//       );
//     }

//     // Apply importance filter
//     if (currentFilters.importance) {
//       filteredQuestions = filteredQuestions.filter(
//         (q) => q.importance.toLowerCase() === currentFilters.importance.toLowerCase()
//       );
//     }

//     // Apply topic filter (support multiple topics)
//     if (currentSelectedTopics.length > 0) {
//       filteredQuestions = filteredQuestions.filter((q) =>
//         currentSelectedTopics.some((topic) => q.topics.includes(topic))
//       );
//     }

//     // Apply review status filter
//     if (currentFilters.markForReview !== "") {
//       const reviewStatus = currentFilters.markForReview === "true";
//       filteredQuestions = filteredQuestions.filter(
//         (q) => q.markForReview === reviewStatus
//       );
//     }

//     // Apply date range filter
//     filteredQuestions = filterByDateRange(
//       filteredQuestions,
//       currentFilters.dateRange,
//       currentFilters.customStartDate,
//       currentFilters.customEndDate
//     );

//     setQuestions(filteredQuestions);
//   };

//   // Apply filters when filter values change
//   useEffect(() => {
//     if (allQuestions.length > 0) {
//       applyFiltersToQuestions(allQuestions, filters, selectedTopics, selectedPlatforms);
//     }
//   }, [filters, selectedTopics, selectedPlatforms, allQuestions]);

//   // Filter topics based on search term
//   const filteredTopics = availableTopics.filter((topic) =>
//     topic.toLowerCase().includes(topicSearchTerm.toLowerCase())
//   );

//   // Filter platforms based on search term
//   const filteredPlatforms = availablePlatforms.filter((platform) =>
//     platform.toLowerCase().includes(platformSearchTerm.toLowerCase())
//   );

//   const getImportanceColor = (level) => {
//     switch (level.toLowerCase()) {
//       case "basic":
//         return "text-green-400";
//       case "important":
//         return "text-yellow-400";
//       case "very important":
//         return "text-red-400";
//       default:
//         return "text-slate-400";
//     }
//   };

//   const toggleReview = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const question = questions.find((q) => q._id === id);
//       if (!question) return;

//       const updatedQuestions = questions.map((q) =>
//         q._id === id ? { ...q, markForReview: !q.markForReview } : q
//       );
//       setQuestions(updatedQuestions);

//       // Also update in allQuestions
//       const updatedAllQuestions = allQuestions.map((q) =>
//         q._id === id ? { ...q, markForReview: !q.markForReview } : q
//       );
//       setAllQuestions(updatedAllQuestions);

//       await axios.put(
//         `http://localhost:5000/api/v1/questions/${id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//     } catch (error) {
//       console.error("Failed to toggle review:", error);
//     }
//   };

//   const deleteQuestion = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this question?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/v1/questions/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Remove from both questions and allQuestions
//       setQuestions(questions.filter((q) => q._id !== id));
//       setAllQuestions(allQuestions.filter((q) => q._id !== id));
//     } catch (error) {
//       console.error("Failed to delete:", error);
//     }
//   };

//   const goToEdit = (id) => {
//     navigate(`/edit/${id}`);
//   };

//   const toggleDropdown = (id) => {
//     setDropdownOpen(dropdownOpen === id ? null : id);
//   };

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterType]: value,
//     }));
//   };

//   const handleTopicSelect = (topic) => {
//     if (selectedTopics.includes(topic)) {
//       setSelectedTopics(selectedTopics.filter((t) => t !== topic));
//     } else {
//       setSelectedTopics([...selectedTopics, topic]);
//     }
//   };

//   const handlePlatformSelect = (platform) => {
//     if (selectedPlatforms.includes(platform)) {
//       setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
//     } else {
//       setSelectedPlatforms([...selectedPlatforms, platform]);
//     }
//   };

//   const removeSelectedTopic = (topicToRemove) => {
//     setSelectedTopics(selectedTopics.filter((topic) => topic !== topicToRemove));
//   };

//   const removeSelectedPlatform = (platformToRemove) => {
//     setSelectedPlatforms(selectedPlatforms.filter((platform) => platform !== platformToRemove));
//   };

//   const clearFilters = () => {
//     setFilters({
//       importance: "",
//       markForReview: "",
//       dateRange: "",
//       customStartDate: "",
//       customEndDate: "",
//     });
//     setSelectedTopics([]);
//     setSelectedPlatforms([]);
//     setTopicSearchTerm("");
//     setPlatformSearchTerm("");
//     setLoading(true);
//     setTimeout(() => {
//       applyFiltersToQuestions();
//       setLoading(false);
//     }, 100);
//   };

//   const hasActiveFilters = 
//     Object.values(filters).some((filter) => filter !== "") || 
//     selectedTopics.length > 0 || 
//     selectedPlatforms.length > 0;

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       setDropdownOpen(null);
//       if (topicDropdownRef.current && !topicDropdownRef.current.contains(event.target)) {
//         setShowTopicDropdown(false);
//       }
//       if (platformDropdownRef.current && !platformDropdownRef.current.contains(event.target)) {
//         setShowPlatformDropdown(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     user && (
//       <div className="min-h-screen bg-[#1F1F1F] text-[#E0E0E0] p-6">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-5xl font-bold mb-10 text-center">
//             📚 DSA Buddy Questions
//           </h1>

//           <div className="bg-[#252525] rounded-lg p-6 mb-6 border border-[#404040]">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <FaFilter className="text-blue-400" />
//                 <h2 className="text-xl font-semibold">Filters</h2>
//                 {hasActiveFilters && (
//                   <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">
//                     {Object.values(filters).filter((f) => f !== "").length + selectedTopics.length + selectedPlatforms.length} active
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
//               >
//                 {showFilters ? "Hide" : "Show"} Filters
//               </button>
//             </div>

//             {showFilters && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {/* Dynamic Platform Filter */}
//                   <div className="relative" ref={platformDropdownRef}>
//                     <label className="block text-sm mb-2 text-slate-300">Platforms</label>
//                     <div
//                       className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white cursor-pointer focus:border-blue-400 min-h-[42px] flex items-center justify-between"
//                       onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
//                     >
//                       <span className={selectedPlatforms.length > 0 ? "text-white" : "text-slate-400"}>
//                         {selectedPlatforms.length > 0 
//                           ? `${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''} selected`
//                           : "Select platforms"
//                         }
//                       </span>
//                       <FaChevronDown className={`text-slate-400 transition-transform ${showPlatformDropdown ? 'rotate-180' : ''}`} />
//                     </div>

//                     {showPlatformDropdown && (
//                       <div className="absolute top-full left-0 right-0 mt-1 bg-[#2A2A2A] border border-[#404040] rounded-lg shadow-lg z-20 max-h-64 overflow-hidden">
//                         {/* Search Bar */}
//                         <div className="p-3 border-b border-[#404040]">
//                           <div className="relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
//                             <input
//                               type="text"
//                               placeholder="Search platforms..."
//                               value={platformSearchTerm}
//                               onChange={(e) => setPlatformSearchTerm(e.target.value)}
//                               className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg pl-10 pr-3 py-2 text-white text-sm focus:border-blue-400 focus:outline-none"
//                             />
//                           </div>
//                         </div>

//                         {/* Platforms List */}
//                         <div className="max-h-40 overflow-y-auto">
//                           {filteredPlatforms.length > 0 ? (
//                             filteredPlatforms.map((platform) => (
//                               <div
//                                 key={platform}
//                                 className="flex items-center px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer"
//                                 onClick={() => handlePlatformSelect(platform)}
//                               >
//                                 <div className="flex items-center justify-center w-4 h-4 mr-3">
//                                   {selectedPlatforms.includes(platform) && (
//                                     <FaCheck className="text-blue-400 text-xs" />
//                                   )}
//                                 </div>
//                                 <span className="text-white text-sm">{platform}</span>
//                               </div>
//                             ))
//                           ) : (
//                             <div className="px-3 py-2 text-slate-400 text-sm">
//                               No platforms found
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm mb-2 text-slate-300">Importance</label>
//                     <select
//                       value={filters.importance}
//                       onChange={(e) => handleFilterChange("importance", e.target.value)}
//                       className="w-full bg-[#1F1F1F] cursor-pointer border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
//                     >
//                       <option value="">All Importance Levels</option>
//                       <option value="basic">Basic</option>
//                       <option value="important">Important</option>
//                       <option value="very important">Very Important</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm mb-2 text-slate-300">Review Status</label>
//                     <select
//                       value={filters.markForReview}
//                       onChange={(e) => handleFilterChange("markForReview", e.target.value)}
//                       className="w-full bg-[#1F1F1F] border  cursor-pointer border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
//                     >
//                       <option value="">All Questions</option>
//                       <option value="true">Marked for Review</option>
//                       <option value="false">Not Marked for Review</option>
//                     </select>
//                   </div>

//                   {/* Date Range Filter */}
//                   <div>
//                     <label className="block text-sm mb-2 text-slate-300">
//                       <FaCalendarAlt className="inline mr-2" />
//                       Date Range
//                     </label>
//                     <select
//                       value={filters.dateRange}
//                       onChange={(e) => handleFilterChange("dateRange", e.target.value)}
//                       className="w-full  cursor-pointer bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
//                     >
//                       <option value="">All Time</option>
//                       <option value="today">Today</option>
//                       <option value="yesterday">Yesterday</option>
//                       <option value="last7days">Last 7 Days</option>
//                       <option value="last30days">Last 30 Days</option>
//                       <option value="thisMonth">This Month</option>
//                       <option value="lastMonth">Last Month</option>
//                       <option value="thisYear">This Year</option>
//                       <option value="custom">Custom Range</option>
//                     </select>
//                   </div>

//                   {/* Custom Date Range */}
//                   {filters.dateRange === "custom" && (
//                     <>
//                       <div>
//                         <label className="block text-sm mb-2 text-slate-300">Start Date</label>
//                         <input
//                           type="date"
//                           value={filters.customStartDate}
//                           onChange={(e) => handleFilterChange("customStartDate", e.target.value)}
//                           className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm mb-2 text-slate-300">End Date</label>
//                         <input
//                           type="date"
//                           value={filters.customEndDate}
//                           onChange={(e) => handleFilterChange("customEndDate", e.target.value)}
//                           className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
//                         />
//                       </div>
//                     </>
//                   )}

//                   {/* Dynamic Topic Filter */}
//                   <div className="relative" ref={topicDropdownRef}>
//                     <label className="block text-sm mb-2 text-slate-300">Topics</label>
//                     <div
//                       className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg px-3 py-2 text-white cursor-pointer focus:border-blue-400 min-h-[42px] flex items-center justify-between"
//                       onClick={() => setShowTopicDropdown(!showTopicDropdown)}
//                     >
//                       <span className={selectedTopics.length > 0 ? "text-white" : "text-slate-400"}>
//                         {selectedTopics.length > 0 
//                           ? `${selectedTopics.length} topic${selectedTopics.length > 1 ? 's' : ''} selected`
//                           : "Select topics"
//                         }
//                       </span>
//                       <FaChevronDown className={`text-slate-400 transition-transform ${showTopicDropdown ? 'rotate-180' : ''}`} />
//                     </div>

//                     {showTopicDropdown && (
//                       <div className="absolute top-full left-0 right-0 mt-1 bg-[#2A2A2A] border border-[#404040] rounded-lg shadow-lg z-20 max-h-64 overflow-hidden">
//                         {/* Search Bar */}
//                         <div className="p-3 border-b border-[#404040]">
//                           <div className="relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
//                             <input
//                               type="text"
//                               placeholder="Search topics..."
//                               value={topicSearchTerm}
//                               onChange={(e) => setTopicSearchTerm(e.target.value)}
//                               className="w-full bg-[#1F1F1F] border border-[#404040] rounded-lg pl-10 pr-3 py-2 text-white text-sm focus:border-blue-400 focus:outline-none"
//                             />
//                           </div>
//                         </div>

//                         {/* Topics List */}
//                         <div className="max-h-40 overflow-y-auto">
//                           {filteredTopics.length > 0 ? (
//                             filteredTopics.map((topic) => (
//                               <div
//                                 key={topic}
//                                 className="flex items-center px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer"
//                                 onClick={() => handleTopicSelect(topic)}
//                               >
//                                 <div className="flex items-center justify-center w-4 h-4 mr-3">
//                                   {selectedTopics.includes(topic) && (
//                                     <FaCheck className="text-blue-400 text-xs" />
//                                   )}
//                                 </div>
//                                 <span className="text-white text-sm">{topic}</span>
//                               </div>
//                             ))
//                           ) : (
//                             <div className="px-3 py-2 text-slate-400 text-sm">
//                               No topics found
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Selected Filters Display */}
//                 {(selectedTopics.length > 0 || selectedPlatforms.length > 0) && (
//                   <div className="mt-4 space-y-3">
//                     {/* Selected Platforms */}
//                     {selectedPlatforms.length > 0 && (
//                       <div>
//                         <label className="block text-sm mb-2 text-slate-300">Selected Platforms:</label>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedPlatforms.map((platform) => (
//                             <span
//                               key={platform}
//                               className="bg-green-500/30 text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
//                             >
//                               {platform}
//                               <button
//                                 onClick={() => removeSelectedPlatform(platform)}
//                                 className="text-green-300 hover:text-green-100 ml-1"
//                               >
//                                 <FaTimes className="text-xs" />
//                               </button>
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Selected Topics */}
//                     {selectedTopics.length > 0 && (
//                       <div>
//                         <label className="block text-sm mb-2 text-slate-300">Selected Topics:</label>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedTopics.map((topic) => (
//                             <span
//                               key={topic}
//                               className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
//                             >
//                               {topic}
//                               <button
//                                 onClick={() => removeSelectedTopic(topic)}
//                                 className="text-purple-300 hover:text-purple-100 ml-1"
//                               >
//                                 <FaTimes className="text-xs" />
//                               </button>
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div className="flex gap-3 mt-6">
//                   {hasActiveFilters && (
//                     <button
//                       onClick={clearFilters}
//                       className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
//                     >
//                       <FaTimes className="text-sm" />
//                       Clear All Filters
//                     </button>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="mb-4 text-slate-400">
//             {!loading && (
//               <p>
//                 Showing {questions.length} of {allQuestions.length} question{questions.length !== 1 ? "s" : ""}
//                 {hasActiveFilters && " (filtered)"}
//               </p>
//             )}
//           </div>

//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="text-center animate-pulse text-slate-400 text-lg py-12">
//                 Loading questions...
//               </div>
//             ) : questions.length === 0 ? (
//               <div className="text-center text-slate-500 text-lg py-12">
//                 {hasActiveFilters ? "No questions match your filters" : "No questions tracked yet! 🚀"}
//               </div>
//             ) : (
//               <table className="w-full border-collapse text-base rounded-xl overflow-hidden bg-[#252525]">
//                 <thead>
//                   <tr className="bg-[#333333] text-left text-[#E0E0E0] text-lg font-semibold border-b border-[#444]">
//                     <th className="p-4">No.</th>
//                     <th className="p-4">Name</th>
//                     <th className="p-4">Platform</th>
//                     <th className="p-4">Mistake</th>
//                     <th className="p-4">Lesson</th>
//                     <th className="p-4">Topics</th>
//                     <th className="p-4">Importance</th>
//                     <th className="p-4">Revise</th>
//                     <th className="p-4 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {questions.map((q, index) => (
//                     <tr key={q._id} className="hover:bg-[#3A3A3A] transition-all">
//                       <td className="p-4 border-b border-[#3A3A3A]">{index + 1}</td>
//                       <td className="p-4 border-b border-[#3A3A3A]">
//                         <a
//                           href={q.questionLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-yellow-300 hover:underline"
//                         >
//                           {q.questionName}
//                         </a>
//                       </td>
//                       <td className="p-4 border-b border-[#3A3A3A]">
//                         <span className={`px-3 py-1 rounded text-sm ${
//                           selectedPlatforms.includes(q.platform)
//                             ? 'bg-green-600/40 text-green-100 border border-green-400'
//                             : 'bg-green-600/30 text-green-200'
//                         }`}>
//                           {q.platform}
//                         </span>
//                       </td>
//                       <td className="p-4 border-b border-[#3A3A3A] text-white">
//                         {q.whatWentWrong}
//                       </td>
//                       <td className="p-4 border-b border-[#3A3A3A] text-white">
//                         {q.whatLearnt}
//                       </td>
//                       <td className="p-4 border-b border-[#3A3A3A]">
//                         <div className="flex flex-wrap gap-1">
//                           {q.topics.map((topic, i) => (
//                             <span
//                               key={i}
//                               className={`px-2 py-1 rounded text-sm ${
//                                 selectedTopics.includes(topic)
//                                   ? 'bg-purple-600/40 text-purple-100 border border-purple-400'
//                                   : 'bg-purple-500/30 text-purple-200'
//                               }`}
//                             >
//                               {topic}
//                             </span>
//                           ))}
//                         </div>
//                       </td>
//                       <td className={`p-4 border-b border-[#3A3A3A] ${getImportanceColor(q.importance)}`}>
//                         {q.importance}
//                       </td>
//                       <td className="p-4 border-b border-[#3A3A3A] text-center">
//                         <button
//                           onClick={() => toggleReview(q._id)}
//                           className="text-xl focus:outline-none transition-colors duration-200 hover:scale-110"
//                         >
//                           <FaStar className={q.markForReview ? "text-yellow-400" : "text-slate-400"} />
//                         </button>
//                       </td>
//                       <td className="p-4 border-b border-[#3A3A3A] text-center relative">
//                         <div className="relative inline-block">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleDropdown(q._id);
//                             }}
//                             className="p-2 hover:bg-[#404040] rounded-full transition-all duration-200"
//                           >
//                             <FaEllipsisV className="text-slate-400 hover:text-slate-200" />
//                           </button>
//                           {dropdownOpen === q._id && (
//                             <div className="absolute right-0 mt-2 w-32 bg-[#2A2A2A] border border-[#404040] rounded-lg shadow-lg z-10">
//                               <button
//                                 onClick={() => {
//                                   goToEdit(q._id);
//                                   setDropdownOpen(null);
//                                 }}
//                                 className="w-full px-4 py-2 text-left text-sm text-blue-400 hover:bg-[#3A3A3A] flex items-center gap-2"
//                               >
//                                 <FaEdit className="text-xs" /> Edit
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   deleteQuestion(q._id);
//                                   setDropdownOpen(null);
//                                 }}
//                                 className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#3A3A3A] flex items-center gap-2"
//                               >
//                                 <FaTrash className="text-xs" /> Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Questions;

// src/pages/Questions.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useUserAuth } from "../hooks/useUserAuth";
import { useQuestions } from "../hooks/useQuestions";
import { useFilters } from "../hooks/useFilters";
import FilterPanel from "../components/Filters/FilterPanel";
import QuestionsTable from "../components/Questions/QuestionsTable.jsx";
import QuestionsHeader from "../components/Questions/QuestionsHeader.jsx";
import EditQuestionModal from "../components/Questions/EditQuestionModel.jsx";
import AddQuestionModal from "../components/Questions/AddQuestionsModal.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Questions = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const {
    questions,
    allQuestions,
    loading,
    deleteQuestion,
    toggleReview,
    setQuestions,
    fetchAllQuestions,
  } = useQuestions();

  const {
    filters,
    filterHandlers,
    hasActiveFilters,
    clearFilters,
  } = useFilters(allQuestions, setQuestions);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

return (
  user && (
    <>
      <div className="min-h-screen bg-[#1F1F1F] text-[#E0E0E0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="  mb-10">
<QuestionsHeader onAddQuestion={() => setShowModal(true)} />
            
          </div>

          <FilterPanel
            filters={filters}
            filterHandlers={filterHandlers}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
            availableTopics={[
              ...new Set(allQuestions.flatMap((q) => q.topics)),
            ].sort()}
            availablePlatforms={[
              ...new Set(allQuestions.map((q) => q.platform)),
            ].sort()}
          />

          <QuestionsTable
            questions={questions}
            allQuestions={allQuestions}
            loading={loading}
            hasActiveFilters={hasActiveFilters}
            deleteQuestion={deleteQuestion}
            toggleReview={toggleReview}
            selectedTopics={filters.selectedTopics}
            selectedPlatforms={filters.selectedPlatforms}
            setSelectedQuestion={setSelectedQuestion}
            setShowEditModal={setShowEditModal}
          />
        </div>

        {showModal && (
          <AddQuestionModal
            onClose={() => setShowModal(false)}
            onQuestionAdded={fetchAllQuestions}
          />
        )}
        {showEditModal && selectedQuestion && (
          <EditQuestionModal
            question={selectedQuestion}
            onClose={() => {
              setShowEditModal(false);
              setSelectedQuestion(null);
            }}
            onQuestionUpdated={fetchAllQuestions}
          />
        )}

        <ScrollToTopButton />
      </div>
    </>
  )
);
}
export default Questions; 