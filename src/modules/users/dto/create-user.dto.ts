import { BaseEntity } from "entities/base.entity"
import { UserEntity } from "entities/user.entity"

export interface CreateUserDto extends Omit<UserEntity, keyof BaseEntity> {}
