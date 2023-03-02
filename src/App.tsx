import useAuth from "modules/auth/hooks/useAuth"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import AppRouter from "./components/core/AppRouter"

export default function App() {
  const { check } = useAuth()

  useEffect(() => check(), [])

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  )
}
