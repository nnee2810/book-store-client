import { OrderEntity } from "./order.entity"
import { ProductEntity } from "./product.entity"

export interface OrderProductEntity {
  order: OrderEntity
  orderId: string
  product: ProductEntity
  productId: string
  price: number
  quantity: number
}
