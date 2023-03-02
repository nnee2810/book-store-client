import { PaginationDto } from "dto/pagination.dto"

export interface GetUsersDto extends PaginationDto {
  name?: string
}
