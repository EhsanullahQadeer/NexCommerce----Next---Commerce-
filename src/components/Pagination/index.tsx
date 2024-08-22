import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  numberOfPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <nav
      className={cn(
        "flex items-center justify-center gap-x-5 py-[14px] px-2 border-[rgba(235,235,235,.55)]"
      )}
    >
      <button
        className="flex items-center text-sm px-2.5 py-[11px] text-gray-500 rounded border border-white hover:border-gray-300 hover:text-primary disabled:opacity-50 disabled:pointer-events-none transition-colors duration-300"
        disabled={true}
      >
        <i className="las la-long-arrow-alt-left mr-2.5"></i>
        Prev
      </button>

      <ol className="flex items-center gap-x-1">
        {Array.from({ length: numberOfPages }, (v, k) => k + 1).map(
          (pageNumber, index) => {
            return (
              <li key={index}>
                <button
                  className={`text-sm w-8 py-[11px] rounded border hover:border-gray-300 hover:text-primary transition-colors duration-300 ${
                    currentPage === pageNumber
                      ? "border-gray-300 text-primary"
                      : "border-white"
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            );
          }
        )}
      </ol>

      <button className="flex items-center text-sm px-2.5 py-[11px] text-gray-500 rounded border border-white hover:border-gray-300 hover:text-primary transition-colors duration-300">
        Next
        <i className="las la-long-arrow-alt-right ml-2.5"></i>
      </button>
    </nav>
  );
};

export default Pagination;
