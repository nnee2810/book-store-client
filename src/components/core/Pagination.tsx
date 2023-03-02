import clsx from "clsx"
import usePagination, { UsePaginationParams } from "hooks/usePagination"

interface PaginationProps extends UsePaginationParams {
  onPageChange?: (page: number) => void
}

export default function Pagination({
  onPageChange,
  ...props
}: PaginationProps) {
  const paginationRange = usePagination(props)

  return (
    <div className="flex justify-center items-center gap-1">
      {paginationRange?.map((item) =>
        typeof item === "number" ? (
          <button
            className={clsx(
              "btn",
              props.currentPage === item ? "btn-primary" : "btn-ghost",
            )}
            onClick={() => onPageChange?.(item)}
            key={item}
          >
            {item}
          </button>
        ) : (
          <div key="sibling">...</div>
        ),
      )}
    </div>
  )
}
