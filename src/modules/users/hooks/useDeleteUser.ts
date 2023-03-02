import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"

export default function useDeleteUser() {
  return useMutation((id: string) => api.delete(`users/${id}`))
}
