import { BaseEntity } from "entities/base.entity"
import { UserEntity } from "entities/user.entity"

export interface UpdateUserDto
  extends Partial<Omit<UserEntity, keyof BaseEntity>> {
  id: string
}
