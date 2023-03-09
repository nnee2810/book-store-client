import clsx from "clsx"
import useAuth from "modules/auth/hooks/useAuth"
import { ReactNode } from "react"
import {
  AiOutlineBook,
  AiOutlineFileText,
  AiOutlinePieChart,
  AiOutlineUsergroupAdd,
} from "react-icons/ai"
import { MdOutlineLogout } from "react-icons/md"
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
  {
    name: "Thống kê",
    href: "/stats",
    icon: <AiOutlinePieChart />,
  },
]

export default function Sidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

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
      <div
        className={clsx(
          "px-8 py-4 flex items-center gap-8 text-red-500 transition-all cursor-pointer",
          "hover:bg-gray-100",
        )}
        onClick={signOut}
      >
        <div className="text-2xl">
          <MdOutlineLogout />
        </div>
        <div className="text-lg font-medium">Đăng xuất</div>
      </div>
    </div>
  )
}
