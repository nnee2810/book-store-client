import { BaseEntity } from "entities/base.entity"
import { ProductEntity } from "entities/product.entity"

export interface CreateProductDto
  extends Omit<ProductEntity, keyof BaseEntity> {}
