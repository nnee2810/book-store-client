import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"
import { OrderEntity } from "entities/order.entity"
import { qs } from "helpers/qs"
import { invalidMessage, requiredMessage } from "helpers/validateMessage"
import moment from "moment"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { GetStatsDto } from "../dto/get-stats.dto"
import { StatsTimeMode } from "../interfaces/stats.interface"

const formSchema: yup.SchemaOf<GetStatsDto> = yup.object().shape({
  timeMode: yup
    .string()
    .label("Thống kê theo")
    .required(requiredMessage)
    .oneOf(Object.keys(StatsTimeMode))
    .typeError(invalidMessage),
  timeValue: yup
    .string()
    .label("Thời gian")
    .required(requiredMessage)
    .typeError(invalidMessage),
})

export default function useGetStats() {
  const methods = useForm<GetStatsDto>({
    defaultValues: {
      timeMode: StatsTimeMode.DATE,
      timeValue: moment().format("YYYY-MM-DD"),
    },
    resolver: yupResolver(formSchema),
  })
  const { mutate, data, isLoading } = useMutation(
    async (data: GetStatsDto) =>
      (await api.get<OrderEntity[]>(`stats?${qs(data)}`)).data,
  )

  const handleSubmit = methods.handleSubmit((data) => mutate(data))

  return { methods, handleSubmit, refetch: mutate, data, isLoading }
}
