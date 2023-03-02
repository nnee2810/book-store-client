import { UserEntity } from "entities/user.entity"

export interface SignInResult {
  user: UserEntity
  token: string
}
