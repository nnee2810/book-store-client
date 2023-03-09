import { useQueryClient } from "@tanstack/react-query"
import Loading from "components/common/loading/Loading"
import Button from "components/core/Button"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { OrderStatus } from "entities/order.entity"
import { useEffect } from "react"
import useGetOrder from "../hooks/useGetOrder"
import useUpdateOrder from "../hooks/useUpdateOrder"

interface ModalViewOrderProps extends ModalBaseProps {
  id?: string
}

export default function ModalViewOrder({ id, ...props }: ModalViewOrderProps) {
  const {
    data,
    isLoading: isGetting,
    refetch,
  } = useGetOrder(String(id), {
    enabled: false,
  })
  const queryClient = useQueryClient()
  const { mutate: update, isLoading: isUpdating } = useUpdateOrder()

  const handleUpdate = (status: OrderStatus) => {
    if (!id) return
    update(
      {
        id,
        status,
      },
      {
        onSuccess() {
          refetch()
          queryClient.invalidateQueries(["get-orders"])
        },
      },
    )
  }

  useEffect(() => {
    if (props.visible) refetch()
  }, [props.visible])

  return (
    <Modal {...props} name="Chi tiết đơn hàng" className="max-w-3xl w-full">
      {isGetting ? (
        <Loading />
      ) : data ? (
        <div className="space-y-4">
          {data.status === OrderStatus.PENDING && (
            <div className="flex gap-2">
              <Button
                colorScheme="success"
                isloading={isUpdating}
                onClick={handleUpdate.bind(null, OrderStatus.PAID)}
              >
                Đã thanh toán
              </Button>
              <Button
                colorScheme="error"
                outline
                isloading={isUpdating}
                onClick={handleUpdate.bind(null, OrderStatus.CANCEL)}
              >
                Hủy đơn hàng
              </Button>
            </div>
          )}
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((item) => (
                <tr key={item.productId}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()}</td>
                  <td className="font-bold">
                    {(item.quantity * item.price).toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold">
                  {data.totalPrice.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </Modal>
  )
}
