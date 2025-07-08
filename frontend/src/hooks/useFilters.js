// src/hooks/useFilters.js
import { useState, useEffect } from "react";
import { applyFiltersToQuestions } from "../utils/filterUtils";

export const useFilters = (allQuestions, setQuestions) => {
  const [filters, setFilters] = useState({
    importance: "",
    markForReview: "",
    dateRange: "",
    customStartDate: "",
    customEndDate: "",
    selectedTopics: [],
    selectedPlatforms: []
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleTopicSelect = (topic) => {
    setFilters(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic]
    }));
  };

  const handlePlatformSelect = (platform) => {
    setFilters(prev => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.includes(platform)
        ? prev.selectedPlatforms.filter(p => p !== platform)
        : [...prev.selectedPlatforms, platform]
    }));
  };

  const removeSelectedTopic = (topicToRemove) => {
    setFilters(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.filter(topic => topic !== topicToRemove)
    }));
  };

  const removeSelectedPlatform = (platformToRemove) => {
    setFilters(prev => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.filter(platform => platform !== platformToRemove)
    }));
  };

  const clearFilters = () => {
    setFilters({
      importance: "",
      markForReview: "",
      dateRange: "",
      customStartDate: "",
      customEndDate: "",
      selectedTopics: [],
      selectedPlatforms: []
    });
  };

  // Apply filters when they change
  useEffect(() => {
    if (allQuestions.length > 0) {
      const filteredQuestions = applyFiltersToQuestions(allQuestions, filters);
      setQuestions(filteredQuestions);
    }
  }, [filters, allQuestions, setQuestions]);

  const hasActiveFilters = 
    filters.importance !== "" ||
    filters.markForReview !== "" ||
    filters.dateRange !== "" ||
    filters.customStartDate !== "" ||
    filters.customEndDate !== "" ||
    filters.selectedTopics.length > 0 ||
    filters.selectedPlatforms.length > 0;

  return {
    filters,
    filterHandlers: {
      handleFilterChange,
      handleTopicSelect,
      handlePlatformSelect,
      removeSelectedTopic,
      removeSelectedPlatform
    },
    hasActiveFilters,
    clearFilters
  };
};