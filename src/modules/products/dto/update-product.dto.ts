import { BaseEntity } from "entities/base.entity"
import { ProductEntity } from "entities/product.entity"

export interface UpdateProductDto
  extends Partial<Omit<ProductEntity, keyof BaseEntity>> {
  id: string
}
