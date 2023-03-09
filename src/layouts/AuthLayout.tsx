import LoadingScreen from "components/common/loading/LoadingScreen"
import { Navigate, Outlet } from "react-router-dom"
import { AuthStatus, useUserStore } from "store/user"

interface AuthLayoutProps {
  auth?: boolean
}

export default function AuthLayout({ auth }: AuthLayoutProps) {
  const { status } = useUserStore()

  if (status === AuthStatus.LOADING) return <LoadingScreen />
  if (auth && status === AuthStatus.FAIL) return <Navigate to="/auth/sign-in" />
  if (!auth && status === AuthStatus.SUCCESS) return <Navigate to="/" />

  return <Outlet />
}
