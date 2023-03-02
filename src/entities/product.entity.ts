import { BaseEntity } from "./base.entity"

export interface ProductEntity extends BaseEntity {
  name: string
  author: string
  genre: string
  publisher: string
  price: number
  quantity: number
}
