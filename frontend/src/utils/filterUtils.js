// src/utils/filterUtils.js

// Helper function to filter questions by date range
export const filterByDateRange = (questions, dateRange, customStartDate, customEndDate) => {
  if (!dateRange && !customStartDate && !customEndDate) return questions;

  const now = new Date();
  let startDate, endDate;

  if (dateRange === "custom") {
    if (customStartDate) startDate = new Date(customStartDate);
    if (customEndDate) {
      endDate = new Date(customEndDate);
      endDate.setHours(23, 59, 59, 999); // End of day
    }
  } else {
    switch (dateRange) {
      case "today":
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "yesterday":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "last7days":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "last30days":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "lastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "thisYear":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        return questions;
    }
  }

  return questions.filter((q) => {
    const questionDate = new Date(q.createdAt || q.dateCreated);
    if (startDate && questionDate < startDate) return false;
    if (endDate && questionDate > endDate) return false;
    return true;
  });
};

// Main function to apply all filters
export const applyFiltersToQuestions = (allQuestions, filters) => {
  let filteredQuestions = [...allQuestions];

  // Apply platform filter
  if (filters.selectedPlatforms.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) =>
      filters.selectedPlatforms.includes(q.platform)
    );
  }

  // Apply importance filter
  if (filters.importance) {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.importance.toLowerCase() === filters.importance.toLowerCase()
    );
  }

  // Apply topic filter
  if (filters.selectedTopics.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) =>
      filters.selectedTopics.some((topic) => q.topics.includes(topic))
    );
  }

  // Apply review status filter
  if (filters.markForReview !== "") {
    const reviewStatus = filters.markForReview === "true";
    filteredQuestions = filteredQuestions.filter(
      (q) => q.markForReview === reviewStatus
    );
  }

  // Apply date range filter
  filteredQuestions = filterByDateRange(
    filteredQuestions,
    filters.dateRange,
    filters.customStartDate,
    filters.customEndDate
  );

  return filteredQuestions;
};