import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { UserEntity } from "entities/user.entity"

export function useGetUser(id: string, options?: any) {
  return useQuery(
    ["get-user", id],
    async () => (await api.get<UserEntity>(`users/${id}`)).data,
    options,
  )
}
