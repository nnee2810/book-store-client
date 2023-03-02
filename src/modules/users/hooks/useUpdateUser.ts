import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "configs/api"
import { UserGender, UserRole } from "entities/user.entity"
import { invalidMessage, requiredMessage } from "helpers/validateMessage"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import { UpdateUserDto } from "../dto/update-user.dto"

const formSchema: yup.Schema<UpdateUserDto> = yup.object().shape({
  id: yup.string().required(),
  name: yup
    .string()
    .label("Họ tên")
    .required(requiredMessage)
    .typeError(invalidMessage),
  age: yup
    .number()
    .label("Tuổi")
    .required(requiredMessage)
    .min(0, invalidMessage)
    .typeError(invalidMessage),
  gender: yup
    .string()
    .label("Giới tính")
    .required(requiredMessage)
    .oneOf(Object.keys(UserGender), invalidMessage)
    .typeError(invalidMessage),
  phone: yup
    .string()
    .label("Số điện thoại")
    .required(requiredMessage)
    .typeError(invalidMessage),
  address: yup
    .string()
    .label("Địa chỉ")
    .required(requiredMessage)
    .typeError(invalidMessage),
  salary: yup
    .number()
    .label("Lương")
    .required(requiredMessage)
    .min(0, invalidMessage)
    .typeError(invalidMessage),
  username: yup
    .string()
    .label("Tên đăng nhập")
    .required(requiredMessage)
    .typeError(invalidMessage),
  password: yup
    .string()
    .label("Mật khẩu")
    .required(requiredMessage)
    .typeError(invalidMessage),
  role: yup
    .string()
    .label("Chức vụ")
    .required(requiredMessage)
    .oneOf(Object.keys(UserRole), invalidMessage)
    .typeError(invalidMessage),
})

export default function useUpdateUser(onSuccess?: () => void) {
  const methods = useForm<UpdateUserDto>({
    defaultValues: {
      name: "",
      age: 0,
      gender: UserGender.MALE,
      phone: "",
      address: "",
      salary: 0,
      username: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(({ id, ...data }: UpdateUserDto) =>
    api.patch(`users/${id}`, data),
  )

  const handleSubmit = methods.handleSubmit((data: UpdateUserDto) =>
    mutate(data, {
      onSuccess() {
        onSuccess?.()
        methods.reset(data)
        toast.success("Cập nhật nhân viên thành công")
        queryClient.invalidateQueries(["get-users"])
      },
    }),
  )

  return { methods, handleSubmit, isLoading }
}
