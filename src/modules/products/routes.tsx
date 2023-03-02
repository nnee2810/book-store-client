import HomeLayout from "layouts/home"
import { RouteObject } from "react-router-dom"
import Products from "./pages/Products"

export const productsRoutes: RouteObject = {
  path: "products",
  element: <HomeLayout />,
  children: [
    {
      path: "",
      element: <Products />,
    },
  ],
}
