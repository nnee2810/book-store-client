import AuthLayout from "layouts/AuthLayout"
import { productsRoutes } from "modules/products/routes"
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
    ],
  },
]

export default function AppRouter() {
  return useRoutes(routes)
}
