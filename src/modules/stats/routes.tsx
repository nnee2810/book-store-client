import HomeLayout from "layouts/home"
import { RouteObject } from "react-router-dom"
import Stats from "./pages/Stats"

export const statsRoutes: RouteObject = {
  path: "stats",
  element: <HomeLayout />,
  children: [
    {
      path: "",
      element: <Stats />,
    },
  ],
}
