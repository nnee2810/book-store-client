import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { OrderEntity } from "entities/order.entity"

export default function useGetOrder(id: string, options: Record<string, any>) {
  return useQuery(
    ["get-order", id],
    async () => (await api.get<OrderEntity>(`orders/${id}`)).data,
    options,
  )
}
