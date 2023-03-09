import { useBoolean } from "@chakra-ui/hooks"
import Loading from "components/common/loading/Loading"
import PageHeader from "components/common/PageHeader"
import Button from "components/core/Button"
import TextInput from "components/core/field/TextInput"
import Menu, { MenuItem } from "components/core/menu"
import Pagination from "components/core/Pagination"
import { takePerPage } from "configs/constants"
import useQueryParams from "hooks/useQueryParams"
import debounce from "lodash.debounce"
import moment from "moment"
import { ChangeEvent, useState } from "react"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { MdMoreHoriz } from "react-icons/md"
import ModalCreateProduct from "../components/ModalCreateProduct"
import ModalDeleteProduct from "../components/ModalDeleteProduct"
import ModalViewProduct from "../components/ModalViewProduct"
import { GetProductsDto } from "../dto/get-products.dto"
import useGetProducts from "../hooks/useGetProducts"

export default function Products() {
  const { queryParams, updateQueryParams } = useQueryParams<GetProductsDto>({
    skip: 0,
    take: takePerPage,
  })
  const { isLoading, data } = useGetProducts(queryParams)
  const [createVisible, setCreateVisible] = useBoolean()
  const [viewId, setViewId] = useState<string | undefined>()
  const [deleteId, setDeleteId] = useState<string | undefined>()

  const handleChangeSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    updateQueryParams({
      name: e.target.value,
    })
  }, 300)

  return (
    <div>
      <PageHeader name="Sản phẩm" />
      <div className="p-4 bg-white rounded-xl space-y-4">
        <div className="flex justify-between">
          <div className="w-60">
            <TextInput
              placeholder="Tìm kiếm..."
              onChange={handleChangeSearch}
            />
          </div>
          <Button colorScheme="success" onClick={setCreateVisible.on}>
            Thêm
          </Button>
        </div>
        <table className="table w-full">
          <thead className="sticky top-0">
            <tr>
              <th>Tên</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
                <td>{item.quantity.toLocaleString()}</td>
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
                    <MenuItem
                      icon={<AiOutlineDelete />}
                      onClick={setDeleteId.bind(null, item.id)}
                    >
                      Xóa
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
      <ModalCreateProduct
        visible={createVisible}
        onClose={setCreateVisible.off}
      />
      <ModalViewProduct
        id={viewId}
        visible={!!viewId}
        onClose={setViewId.bind(null, undefined)}
      />
      <ModalDeleteProduct
        id={deleteId}
        visible={!!deleteId}
        onClose={setDeleteId.bind(null, undefined)}
      />
    </div>
  )
}
