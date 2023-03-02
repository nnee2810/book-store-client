import { useMemo } from "react"
import { generateNumberRange } from "utils/generateNumberRange"

export interface UsePaginationParams {
  currentPage: number
  totalPage: number
  siblingCount?: number
}

export default function usePagination({
  currentPage,
  totalPage,
  siblingCount = 1,
}: UsePaginationParams) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPage) {
      return generateNumberRange(1, totalPage)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPage - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPage

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = generateNumberRange(1, leftItemCount)

      return [...leftRange, "...", totalPage]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = generateNumberRange(
        totalPage - rightItemCount + 1,
        totalPage,
      )
      return [firstPageIndex, "...", ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = generateNumberRange(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex]
    }
  }, [currentPage, totalPage, siblingCount])

  return paginationRange
}
