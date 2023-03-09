import { OrderType } from "entities/order.entity"

interface OrderItem {
  productId: string
  quantity: number
  productName?: string
}

export interface CreateOrderDto {
  type: OrderType | string
  items: OrderItem[]
}
