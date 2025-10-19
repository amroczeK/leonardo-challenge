import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Calculate which page numbers to display in pagination
 * Shows up to 5 page numbers, centered around the current page
 */
function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number
): number[] {
  const maxVisible = 5;

  // If we can show all pages, do it
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculate the start page, keeping current page centered when possible
  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + maxVisible - 1, totalPages);

  // Adjust start if we're near the end
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevPage: number | null;
  nextPage: number | null;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  prevPage,
  nextPage,
}: PaginationControlsProps) {
  const visiblePages = getVisiblePageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          {prevPage && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(prevPage);
                }}
              />
            </PaginationItem>
          )}

          {visiblePages.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={pageNum === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {nextPage && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(nextPage);
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
