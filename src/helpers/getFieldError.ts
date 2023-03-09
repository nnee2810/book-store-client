export function getFieldError(errors: any, name: string) {
  if (errors?.[name]) return String(errors[name]?.message)
  if (name.split(".").length === 3) {
    const arr = name.split(".")
    if (errors?.[arr[0]]?.[arr[1]]?.[arr[2]]?.message)
      return String(errors?.[arr[0]]?.[arr[1]]?.[arr[2]]?.message)
  }
  return null
}
