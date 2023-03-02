import { PaginationDto } from "dto/pagination.dto"

export interface GetProductsDto extends PaginationDto {
  name?: string
}
