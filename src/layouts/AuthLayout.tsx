import LoadingScreen from "components/common/loading/LoadingScreen"
import { Navigate, Outlet } from "react-router-dom"
import { AuthState, useUserStore } from "store/user"

interface AuthLayoutProps {
  auth?: boolean
}

export default function AuthLayout({ auth }: AuthLayoutProps) {
  const { state } = useUserStore()

  if (state === AuthState.LOADING) return <LoadingScreen />
  if (auth && state === AuthState.FAIL) return <Navigate to="/auth/sign-in" />
  if (!auth && state === AuthState.SUCCESS) return <Navigate to="/" />

  return <Outlet />
}
