import clsx from "clsx"
import { PropsWithChildren } from "react"

interface BadgeProps {
  colorScheme?: "primary" | "success" | "warning" | "error"
  outline?: boolean
  className?: string
}

export default function Badge({
  colorScheme = "primary",
  outline,
  className,
  children,
}: PropsWithChildren<BadgeProps>) {
  return (
    <div
      className={clsx(
        "badge",
        {
          "badge-primary": colorScheme === "primary",
          "badge-success": colorScheme === "success",
          "badge-warning": colorScheme === "warning",
          "badge-error": colorScheme === "error",
          "badge-outline": outline,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
