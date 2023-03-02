import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { ProductEntity } from "entities/product.entity"

export default function useGetProduct(id: string, options?: any) {
  return useQuery(
    ["get-product", id],
    async () => (await api.get<ProductEntity>(`products/${id}`)).data,
    options,
  )
}
