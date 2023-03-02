import queryString from "query-string"

export function qs(params: Record<string, any>) {
  return queryString.stringify(params, {
    skipEmptyString: true,
    skipNull: true,
  })
}
