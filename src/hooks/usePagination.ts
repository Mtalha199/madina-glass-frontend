import { useState } from "react";

interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  paginatedItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setItems: (items: T[]) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

/**
 * Custom hook for managing pagination state and logic
 * Works with both server-side and client-side pagination
 */
export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const { itemsPerPage = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate pagination values
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure current page is within valid range
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  // Calculate indices for current page
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get items for current page (client-side pagination)
  const paginatedItems = items.slice(startIndex, endIndex);

  // Navigation functions
  function goToPage(page: number) {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  }

  function nextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function previousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function setItems() {
    // Reset to page 1 when items change
    setCurrentPage(1);
  }

  return {
    currentPage: validPage,
    totalPages,
    currentItems: paginatedItems,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
    setItems,
    startIndex,
    endIndex,
    totalItems,
  };
}

