import clsx from "clsx"
import Loading from "components/common/loading/Loading"
import PageHeader from "components/common/PageHeader"
import Button from "components/core/Button"
import Field from "components/core/field"
import { OrderEntity, OrderType } from "entities/order.entity"
import useMounted from "hooks/useMounted"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { FormProvider } from "react-hook-form"
import useGetStats from "../hooks/useGetStats"
import { StatsTimeMode } from "../interfaces/stats.interface"

export default function Stats() {
  const mounted = useMounted()
  const { methods, handleSubmit, data, isLoading } = useGetStats()
  const { timeMode } = methods.watch()
  const [orderType, setOrderType] = useState<OrderType>()
  const [stats, setStats] = useState<OrderEntity[]>([])

  const [totalBuyPrice, totalSellPrice] = useMemo(() => {
    if (data)
      return [
        data.reduce(
          (total, current) =>
            (total += current.type === OrderType.BUY ? current.totalPrice : 0),
          0,
        ),
        data.reduce(
          (total, current) =>
            (total += current.type === OrderType.SELL ? current.totalPrice : 0),
          0,
        ),
      ]
    return [0, 0]
  }, [data])

  useEffect(() => {
    if (!mounted) handleSubmit()
  }, [mounted])
  useEffect(() => {
    if (mounted) methods.setValue("timeValue", "")
  }, [timeMode])
  useEffect(() => {
    if (!data) return
    if (orderType) setStats(data.filter((item) => item.type === orderType))
    else setStats(data)
  }, [data, orderType])

  return (
    <div>
      <PageHeader name="Thống kê" />
      <div className="space-y-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Field
              variant="select"
              options={[
                {
                  label: "Ngày",
                  value: StatsTimeMode.DATE,
                },
                {
                  label: "Tuần",
                  value: StatsTimeMode.WEEK,
                },
                {
                  label: "Tháng",
                  value: StatsTimeMode.MONTH,
                },
              ]}
              name="timeMode"
              label="Thống kê theo"
            />
            <Field
              variant="text"
              type={timeMode.toLowerCase()}
              name="timeValue"
              label="Thời gian"
            />
            <div className="mt-5">
              <Button>Tìm kiếm</Button>
            </div>
          </form>
        </FormProvider>
        <div className="grid grid-cols-[auto_1fr] items-start gap-4">
          <div className="space-y-4">
            <div
              className={clsx(
                "block stats border-2 shadow cursor-pointer transition-all",
                orderType === OrderType.SELL
                  ? "border-blue-500"
                  : "border-transparent",
              )}
              onClick={setOrderType.bind(null, OrderType.SELL)}
            >
              <div className="stat">
                <div className="stat-title">Tổng thu</div>
                <div className="stat-value text-green-500">
                  {totalSellPrice.toLocaleString()}đ
                </div>
                <div className="stat-desc">Chỉ tính đơn hàng đã thanh toán</div>
              </div>
            </div>
            <div
              className={clsx(
                "block stats border-2 shadow cursor-pointer transition-all",
                orderType === OrderType.BUY
                  ? "border-blue-500"
                  : "border-transparent",
              )}
              onClick={setOrderType.bind(null, OrderType.BUY)}
            >
              <div className="stat">
                <div className="stat-title">Tổng chi</div>
                <div className="stat-value text-red-500">
                  {totalBuyPrice.toLocaleString()}đ
                </div>
                <div className="stat-desc">Chỉ tính đơn hàng đã thanh toán</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Người thực hiện</th>
                  <th>Biến động</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user.name}</td>
                    <td
                      className={clsx(
                        item.type === OrderType.BUY
                          ? "text-red-500"
                          : "text-green-500",
                      )}
                    >
                      {item.type === OrderType.BUY ? "-" : "+"}
                      {item.totalPrice.toLocaleString()}
                    </td>
                    <td>{moment(item.createdAt).format("DD/MM/YY HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isLoading ? (
              <Loading />
            ) : (
              !data?.length && (
                <div className="text-center">Không có dữ liệu</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
