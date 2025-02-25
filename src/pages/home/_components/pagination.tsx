import type React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const visiblePageNumbers = [];

    if (totalPages <= 7) {
      return pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {number + 1}
        </button>
      ));
    }

    if (currentPage > 2) {
      visiblePageNumbers.push(1);
      if (currentPage > 3) {
        visiblePageNumbers.push("...");
      }
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 2);
      i++
    ) {
      visiblePageNumbers.push(i);
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        visiblePageNumbers.push("...");
      }
      visiblePageNumbers.push(totalPages - 1);
    }

    return visiblePageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => typeof number === "number" && onPageChange(number)}
        className={`px-3 py-1 rounded-md ${
          currentPage === number
            ? "bg-blue-500 text-white"
            : number === "..."
            ? "bg-white text-gray-700 cursor-default"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        disabled={number === "..."}
      >
        {number}
      </button>
    ));
  };
  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className={`px-2 py-1 rounded-md ${
          currentPage === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-2 py-1 rounded-md ${
          currentPage === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-2 py-1 rounded-md ${
          currentPage === totalPages - 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-2 py-1 rounded-md ${
          currentPage === totalPages - 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Last
      </button>
    </nav>
  );
};

export default Pagination;
