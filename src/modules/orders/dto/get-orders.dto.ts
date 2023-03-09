import { PaginationDto } from "dto/pagination.dto"
import { OrderStatus, OrderType } from "entities/order.entity"

export interface GetOrdersDto extends PaginationDto {
  status?: OrderStatus
  type?: OrderType
}
