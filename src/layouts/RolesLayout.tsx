import ForbiddenScreen from "components/common/ForbiddenScreen"
import { UserRole } from "entities/user.entity"
import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { useUserStore } from "store/user"

interface RolesLayoutProps {
  roles: UserRole[]
}

export default function RolesLayout({
  roles,
  children,
}: PropsWithChildren<RolesLayoutProps>) {
  const { user } = useUserStore()

  if (!user) return <Navigate to="/auth/sign-in" />
  if (!roles.includes(user.role as UserRole)) return <ForbiddenScreen />

  return <>{children}</>
}
