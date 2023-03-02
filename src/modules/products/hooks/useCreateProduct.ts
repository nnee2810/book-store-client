import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "configs/api"
import { ProductEntity } from "entities/product.entity"
import { invalidMessage, requiredMessage } from "helpers/validateMessage"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import { CreateProductDto } from "../dto/create-product.dto"

const formSchema: yup.Schema<CreateProductDto> = yup.object().shape({
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

export default function useCreateProduct(onSuccess?: () => void) {
  const methods = useForm<CreateProductDto>({
    defaultValues: {
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
  const { mutate, isLoading } = useMutation((data: CreateProductDto) =>
    api.post<ProductEntity>("products", data),
  )

  const handleSubmit = methods.handleSubmit((data: CreateProductDto) =>
    mutate(data, {
      onSuccess() {
        onSuccess?.()
        methods.reset()
        toast.success("Thêm sản phẩm thành công")
        queryClient.invalidateQueries(["get-products"])
      },
    }),
  )

  return { methods, handleSubmit, isLoading }
}
