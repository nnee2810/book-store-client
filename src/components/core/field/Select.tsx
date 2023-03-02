import clsx from "clsx"
import { SelectHTMLAttributes } from "react"

interface SelectOption {
  label: string
  value: number | string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "select"
  isInvalid?: boolean
  options: SelectOption[]
}

export default function Select({
  variant,
  options,
  isInvalid,
  className,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={clsx(
        "select select-bordered w-full",
        {
          "select-error": isInvalid,
        },
        className,
      )}
    >
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
