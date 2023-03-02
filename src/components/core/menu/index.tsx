import clsx from "clsx"
import { PropsWithChildren, ReactNode } from "react"
import Button from "../Button"

interface MenuProps {
  label: ReactNode
  placement?:
    | "top"
    | "top-end"
    | "bottom"
    | "end"
    | "bottom-end"
    | "left"
    | "left-end"
    | "right"
    | "right-end"
}

export default function Menu({
  label,
  placement,
  children,
}: PropsWithChildren<MenuProps>) {
  return (
    <div
      className={clsx("dropdown", {
        "dropdown-top": placement === "top" || placement === "top-end",
        "dropdown-bottom": placement === "bottom" || placement === "bottom-end",
        "dropdown-left": placement === "left" || placement === "left-end",
        "dropdown-right": placement === "right" || placement === "right-end",
        "dropdown-end":
          placement === "end" ||
          placement === "top-end" ||
          placement === "bottom-end" ||
          placement === "left-end" ||
          placement === "right-end",
      })}
    >
      <label tabIndex={0}>
        {typeof label === "string" ? (
          <Button colorScheme="primary">{label}</Button>
        ) : (
          label
        )}
      </label>
      <ul
        tabIndex={0}
        className="w-48 p-2 dropdown-content menu bg-base-100 rounded-lg shadow"
      >
        {children}
      </ul>
    </div>
  )
}

export { default as MenuItem } from "./MenuItem"
