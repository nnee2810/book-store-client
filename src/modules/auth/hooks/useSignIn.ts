import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"
import { Key } from "configs/constants"
import { requiredMessage } from "helpers/validateMessage"
import { SignInDto } from "modules/auth/dto/sign-in.dto"
import { useForm } from "react-hook-form"
import { useUserStore } from "store/user"
import * as yup from "yup"
import { SignInResult } from "../interfaces/sign-in-result.interface"

const formSchema: yup.Schema<SignInDto> = yup.object().shape({
  username: yup.string().label("Tên đăng nhập").required(requiredMessage),
  password: yup.string().label("Mật khẩu").required(requiredMessage),
})

export default function useSignIn() {
  const { setUser } = useUserStore()
  const methods = useForm<SignInDto>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
  })
  const { mutate, isLoading } = useMutation((data: SignInDto) =>
    api.post<SignInResult>("auth/sign-in", data),
  )

  const handleSubmit = methods.handleSubmit((data: SignInDto) =>
    mutate(data, {
      onSuccess({ data: { user, token } }) {
        setUser(user)
        localStorage.setItem(Key.TOKEN, token)
      },
    }),
  )

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
