import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { UserEntity } from "entities/user.entity"
import { qs } from "helpers/qs"
import { PaginationResult } from "interfaces/pagination-result.interface"
import { GetProductsDto } from "modules/products/dto/get-products.dto"

export function useGetUsers(params: GetProductsDto) {
  return useQuery(
    ["get-users", params],
    async () =>
      (await api.get<PaginationResult<UserEntity>>(`users?${qs(params)}`)).data,
  )
}
