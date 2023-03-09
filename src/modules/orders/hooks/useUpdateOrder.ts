import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"
import { UpdateOrderDto } from "../dto/update-order.dto"

export default function useUpdateOrder() {
  return useMutation(({ id, ...data }: UpdateOrderDto) =>
    api.patch(`orders/${id}`, data),
  )
}
