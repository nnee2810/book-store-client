import { UserEntity } from "entities/user.entity"
import { create } from "zustand"

export enum AuthStatus {
  LOADING,
  SUCCESS,
  FAIL,
}

interface UserState {
  status: AuthStatus
  user: UserEntity | null
  setUser(user: UserEntity): void
  clearUser(): void
}

export const useUserStore = create<UserState>((set) => ({
  status: AuthStatus.LOADING,
  user: null,
  setUser: (user: UserEntity) =>
    set({
      status: AuthStatus.SUCCESS,
      user,
    }),
  clearUser: () =>
    set({
      status: AuthStatus.FAIL,
      user: null,
    }),
}))
