import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "configs/api"
import { invalidMessage, requiredMessage } from "helpers/validateMessage"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import { UpdateProductDto } from "../dto/update-product.dto"

const formSchema: yup.SchemaOf<UpdateProductDto> = yup.object().shape({
  id: yup.string().required(),
  name: yup
    .string()
    .label("Tên")
    .required(requiredMessage)
    .typeError(invalidMessage),
  author: yup
    .string()
    .label("Tác giả")
    .required(requiredMessage)
    .typeError(invalidMessage),
  genre: yup
    .string()
    .label("Thể loại")
    .required(requiredMessage)
    .typeError(invalidMessage),
  publisher: yup
    .string()
    .label("Nhà xuất bản")
    .required(requiredMessage)
    .typeError(invalidMessage),
  price: yup
    .number()
    .label("Giá")
    .required(requiredMessage)
    .typeError(invalidMessage),
  quantity: yup
    .number()
    .label("Số lượng")
    .required(requiredMessage)
    .typeError(invalidMessage),
})

export default function useUpdateProduct(onSuccess?: () => void) {
  const methods = useForm<UpdateProductDto>({
    defaultValues: {
      id: "",
      name: "",
      author: "",
      genre: "",
      publisher: "",
      price: 0,
      quantity: 0,
    },
    resolver: yupResolver(formSchema),
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ id, ...data }: UpdateProductDto) => api.patch(`products/${id}`, data),
  )

  const handleSubmit = methods.handleSubmit((data: UpdateProductDto) =>
    mutate(data, {
      onSuccess() {
        onSuccess?.()
        methods.reset(data)
        toast.success("Cập nhật sản phẩm thành công")
        queryClient.invalidateQueries(["get-products"])
      },
    }),
  )

  return { methods, handleSubmit, isLoading }
}
