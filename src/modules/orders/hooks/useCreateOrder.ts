import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "configs/api"
import { OrderEntity, OrderType } from "entities/order.entity"
import { invalidMessage, requiredMessage } from "helpers/validateMessage"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as yup from "yup"
import { CreateOrderDto } from "../dto/create-order.dto"

const formSchema: yup.SchemaOf<CreateOrderDto> = yup.object().shape({
  type: yup
    .string()
    .label("Loại đơn hàng")
    .required(requiredMessage)
    .oneOf(Object.keys(OrderType), invalidMessage)
    .typeError(invalidMessage),
  items: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.string().required(),
        productName: yup.string(),
        quantity: yup
          .number()
          .label("Số lượng")
          .required(requiredMessage)
          .min(1, invalidMessage)
          .typeError(invalidMessage),
      }),
    )
    .required(),
})

export default function useCreateOrder(onSuccess?: (id: string) => void) {
  const methods = useForm<CreateOrderDto>({
    defaultValues: {
      type: OrderType.SELL,
      items: [],
    },
    resolver: yupResolver(formSchema),
  })
  const fieldMethods = useFieldArray({
    control: methods.control,
    name: "items",
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    async (data: CreateOrderDto) =>
      (await api.post<OrderEntity>("orders", data)).data,
  )

  const handleSubmit = methods.handleSubmit((data) =>
    mutate(data, {
      onSuccess(data) {
        onSuccess?.(data.id)
        methods.reset()
        toast.success("Thêm đơn hàng thành công")
        queryClient.invalidateQueries(["get-orders"])
      },
    }),
  )

  return {
    methods,
    fieldMethods,
    handleSubmit,
    isLoading,
  }
}
