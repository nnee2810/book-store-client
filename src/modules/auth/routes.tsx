import { RouteObject } from "react-router-dom"
import SignIn from "./pages/SignIn"

export const authRoutes: RouteObject[] = [
  {
    path: "sign-in",
    element: <SignIn />,
  },
]
