import clsx from "clsx"
import { ReactNode } from "react"
import {
  AiOutlineBook,
  AiOutlineFileText,
  AiOutlineUsergroupAdd,
} from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"

const items: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "Sản phẩm",
    href: "/products",
    icon: <AiOutlineBook />,
  },
  {
    name: "Nhân viên",
    href: "/users",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    name: "Đơn hàng",
    href: "/orders",
    icon: <AiOutlineFileText />,
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col justify-center">
      {items.map((item) => (
        <Link to={item.href} key={item.href}>
          <div
            className={clsx(
              "px-8 py-4 flex items-center gap-8 transition-all",
              "hover:bg-gray-100",
              location.pathname.includes(item.href)
                ? "text-blue-500"
                : "text-gray-400",
            )}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="text-lg font-medium">{item.name}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
