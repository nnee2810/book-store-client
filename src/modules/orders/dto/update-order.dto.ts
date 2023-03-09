import { OrderStatus } from "entities/order.entity"

export interface UpdateOrderDto {
  id: string
  status?: OrderStatus
}
