import { useBoolean } from "@chakra-ui/hooks"
import Loading from "components/common/loading/Loading"
import PageHeader from "components/common/PageHeader"
import Badge from "components/core/Badge"
import Button from "components/core/Button"
import ButtonGroup from "components/core/ButtonGroup"
import Menu, { MenuItem } from "components/core/menu"
import Pagination from "components/core/Pagination"
import { takePerPage } from "configs/constants"
import { OrderStatus, OrderType } from "entities/order.entity"
import useQueryParams from "hooks/useQueryParams"
import { SelectOption } from "interfaces/select-option.interface"
import moment from "moment"
import { useState } from "react"
import { AiOutlineEye } from "react-icons/ai"
import { MdMoreHoriz } from "react-icons/md"
import ModalCreateOrder from "../components/ModalCreateOrder"
import ModalViewOrder from "../components/ModalViewOrder"
import { GetOrdersDto } from "../dto/get-orders.dto"
import useGetOrders from "../hooks/useGetOrders"

export default function Orders() {
  const { queryParams, updateQueryParams } = useQueryParams<GetOrdersDto>({
    skip: 0,
    take: takePerPage,
  })
  const { data, isLoading } = useGetOrders(queryParams)
  const [createVisible, setCreateVisible] = useBoolean()
  const [viewId, setViewId] = useState<string | undefined>()

  return (
    <div>
      <PageHeader name="Đơn hàng" />
      <div className="p-4 bg-white rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <ButtonGroup
              colorScheme="primary"
              options={[
                {
                  label: "Bán hàng",
                  value: OrderType.SELL,
                },
                {
                  label: "Nhập hàng",
                  value: OrderType.BUY,
                },
              ]}
              onChange={(selected?: SelectOption<OrderType>) =>
                updateQueryParams({
                  type: selected?.value,
                })
              }
            />
            <ButtonGroup
              colorScheme="primary"
              options={[
                {
                  label: "Đang chờ",
                  value: OrderStatus.PENDING,
                },
                {
                  label: "Đã thanh toán",
                  value: OrderStatus.PAID,
                },
                {
                  label: "Đã hủy",
                  value: OrderStatus.CANCEL,
                },
              ]}
              onChange={(selected?: SelectOption<OrderStatus>) =>
                updateQueryParams({
                  status: selected?.value,
                })
              }
            />
          </div>
          <Button colorScheme="success" onClick={setCreateVisible.on}>
            Thêm
          </Button>
        </div>
        <table className="table w-full">
          <thead className="sticky top-0">
            <tr>
              <th>Người tạo</th>
              <th>Loại</th>
              <th>Giá trị</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => (
              <tr key={item.id}>
                <td>{item.user.name}</td>
                <td>
                  {item.type === OrderType.SELL && "Bán hàng"}
                  {item.type === OrderType.BUY && "Nhập hàng"}
                </td>
                <td>{item.totalPrice.toLocaleString()}</td>
                <td>
                  {item.status === OrderStatus.PENDING && (
                    <Badge colorScheme="primary" outline>
                      Đang chờ
                    </Badge>
                  )}
                  {item.status === OrderStatus.PAID && (
                    <Badge colorScheme="success">Đã thanh toán</Badge>
                  )}
                  {item.status === OrderStatus.CANCEL && (
                    <Badge colorScheme="error">Đã hủy</Badge>
                  )}
                </td>
                <td>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                <td>{moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}</td>
                <td>
                  <Menu
                    label={
                      <Button ghost className="text-xl">
                        <MdMoreHoriz />
                      </Button>
                    }
                    placement="left"
                  >
                    <MenuItem
                      icon={<AiOutlineEye />}
                      onClick={setViewId.bind(null, item.id)}
                    >
                      Chi tiết
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <Loading />}
        {data && (
          <Pagination
            currentPage={data.skip / takePerPage + 1}
            totalPage={Math.ceil(data.total / data.take)}
            onPageChange={(page) =>
              updateQueryParams({ skip: takePerPage * (page - 1) })
            }
          />
        )}
      </div>
      <ModalCreateOrder
        visible={createVisible}
        onClose={setCreateVisible.off}
        onSuccess={(id) => setViewId(id)}
      />
      <ModalViewOrder
        id={viewId}
        visible={!!viewId}
        onClose={setViewId.bind(null, undefined)}
      />
    </div>
  )
}
