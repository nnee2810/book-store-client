import { UserRole } from "entities/user.entity"
import HomeLayout from "layouts/home"
import RolesLayout from "layouts/RolesLayout"
import { RouteObject } from "react-router-dom"
import Users from "./pages/Users"

export const usersRoutes: RouteObject = {
  path: "users",
  element: (
    <RolesLayout roles={[UserRole.ADMIN]}>
      <HomeLayout />
    </RolesLayout>
  ),
  children: [
    {
      path: "",
      element: <Users />,
    },
  ],
}
