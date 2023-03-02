import { BaseEntity } from "./base.entity"

export enum UserGender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}
export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  ADMIN = "ADMIN",
}

export interface UserEntity extends BaseEntity {
  name: string
  age: number
  gender: UserGender | string
  phone: string
  address: string
  salary: number
  username: string
  password: string
  role: UserRole | string
}
