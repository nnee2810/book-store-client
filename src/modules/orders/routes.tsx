import HomeLayout from "layouts/home"
import { RouteObject } from "react-router-dom"
import Orders from "./pages/Orders"

export const ordersRoutes: RouteObject = {
  path: "orders",
  element: <HomeLayout />,
  children: [
    {
      path: "",
      element: <Orders />,
    },
  ],
}
