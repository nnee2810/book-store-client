import { BaseEntity } from "./base.entity"
import { OrderProductEntity } from "./order-product.entity"
import { UserEntity } from "./user.entity"

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCEL = "CANCEL",
}

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL",
}

export interface OrderEntity extends BaseEntity {
  user: UserEntity
  userId: string
  products: OrderProductEntity[]
  totalPrice: number
  status: OrderStatus
  type: OrderType
}
