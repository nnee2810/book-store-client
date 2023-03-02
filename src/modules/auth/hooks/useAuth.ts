import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"
import { UserEntity } from "entities/user.entity"
import { useUserStore } from "store/user"

export default function useAuth() {
  const { setUser, clearUser } = useUserStore()
  const { mutate: check } = useMutation(
    async () => (await api.get<UserEntity>("auth/check")).data,
    {
      onSuccess(data) {
        setUser(data)
      },
      onError() {
        clearUser()
      },
    },
  )
  const signOut = () => clearUser()

  return { check, signOut }
}
