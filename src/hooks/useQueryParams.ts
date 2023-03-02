import { useCallback, useState } from "react"

export default function useQueryParams<T extends Record<string, any>>(
  initialValues: T,
) {
  const [queryParams, setQueryParams] = useState<T>(initialValues)

  const updateQueryParams = useCallback(
    (values: Partial<T>) =>
      setQueryParams((prev) => ({
        ...prev,
        ...values,
      })),
    [setQueryParams],
  )

  return {
    queryParams,
    updateQueryParams,
  }
}
