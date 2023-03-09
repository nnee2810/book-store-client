import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { OrderEntity } from "entities/order.entity"
import { qs } from "helpers/qs"
import { PaginationResult } from "interfaces/pagination-result.interface"
import { GetOrdersDto } from "../dto/get-orders.dto"

export default function useGetOrders(query: GetOrdersDto) {
  return useQuery(
    ["get-orders", query],
    async () =>
      (await api.get<PaginationResult<OrderEntity>>(`orders?${qs(query)}`))
        .data,
  )
}
