import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"

export default function useDeleteProduct() {
  return useMutation((id: string) => api.delete(`products/${id}`))
}
