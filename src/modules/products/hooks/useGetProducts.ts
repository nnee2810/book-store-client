import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { ProductEntity } from "entities/product.entity"
import { qs } from "helpers/qs"
import { PaginationResult } from "interfaces/pagination-result.interface"
import { GetProductsDto } from "../dto/get-products.dto"

export default function useGetProducts(query: GetProductsDto) {
  return useQuery(
    ["get-products", query],
    async () =>
      (await api.get<PaginationResult<ProductEntity>>(`products?${qs(query)}`))
        .data,
  )
}
