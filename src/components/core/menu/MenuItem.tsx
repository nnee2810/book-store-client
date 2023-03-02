import { HTMLAttributes, PropsWithChildren, ReactNode } from "react"

interface MenuItemProps extends HTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode
}

export default function MenuItem({
  icon,
  children,
  ...props
}: PropsWithChildren<MenuItemProps>) {
  return (
    <li>
      <a {...props}>
        <div className="flex items-center gap-2">
          {icon}
          {children}
        </div>
      </a>
    </li>
  )
}
