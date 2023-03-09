import { useBoolean } from "@chakra-ui/hooks"
import { useEffect } from "react"

export default function useMounted() {
  const [mounted, setMounted] = useBoolean()

  useEffect(() => {
    setMounted.on()
  }, [])

  return mounted
}
