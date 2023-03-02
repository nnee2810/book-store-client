import { UserEntity } from "entities/user.entity"
import { create } from "zustand"

export enum AuthState {
  LOADING,
  SUCCESS,
  FAIL,
}

interface UserState {
  state: AuthState
  user: UserEntity | null
  setUser(user: UserEntity): void
  clearUser(): void
}

export const useUserStore = create<UserState>((set) => ({
  state: AuthState.LOADING,
  user: null,
  setUser: (user: UserEntity) =>
    set({
      state: AuthState.SUCCESS,
      user,
    }),
  clearUser: () =>
    set({
      state: AuthState.FAIL,
      user: null,
    }),
}))
