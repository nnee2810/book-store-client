import AuthLayout from "layouts/AuthLayout"
import { ordersRoutes } from "modules/orders/routes"
import { productsRoutes } from "modules/products/routes"
import { statsRoutes } from "modules/stats/routes"
import { usersRoutes } from "modules/users/routes"
import { Navigate, RouteObject, useRoutes } from "react-router-dom"
import { authRoutes } from "../../modules/auth/routes"

const routes: RouteObject[] = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: "",
    element: <AuthLayout auth />,
    children: [
      { path: "", element: <Navigate to="/products" /> },
      productsRoutes,
      usersRoutes,
      ordersRoutes,
      statsRoutes,
    ],
  },
]

export default function AppRouter() {
  return useRoutes(routes)
}
