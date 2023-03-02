import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function HomeLayout() {
  return (
    <div className="h-screen grid grid-cols-[300px_auto]">
      <Sidebar />
      <div className="p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
