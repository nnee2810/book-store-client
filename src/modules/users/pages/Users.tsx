import { useBoolean } from "@chakra-ui/hooks"
import Loading from "components/common/loading/Loading"
import PageHeader from "components/common/PageHeader"
import Button from "components/core/Button"
import TextInput from "components/core/field/TextInput"
import Menu, { MenuItem } from "components/core/menu"
import Pagination from "components/core/Pagination"
import { takePerPage } from "configs/constants"
import { UserRole } from "entities/user.entity"
import useQueryParams from "hooks/useQueryParams"
import debounce from "lodash.debounce"
import moment from "moment"
import { ChangeEvent, useCallback, useState } from "react"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { MdMoreHoriz } from "react-icons/md"
import ModalCreateUser from "../components/ModalCreateUser"
import ModalDeleteUser from "../components/ModalDeleteUser"
import ModalViewUser from "../components/ModalViewUser"
import { GetUsersDto } from "../dto/get-users.dto"
import { useGetUsers } from "../hooks/useGetUsers"

export default function Users() {
  const { queryParams, updateQueryParams } = useQueryParams<GetUsersDto>({
    skip: 0,
    take: takePerPage,
  })
  const { isLoading, data } = useGetUsers(queryParams)
  const [createVisible, setCreateVisible] = useBoolean()
  const [viewId, setViewId] = useState<string | undefined>()
  const [deleteId, setDeleteId] = useState<string | undefined>()

  const handleChangeSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      updateQueryParams({
        name: e.target.value,
      })
    }, 300),
    [updateQueryParams],
  )

  return (
    <div>
      <PageHeader name="Nhân viên" />
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
              <th>Họ tên</th>
              <th>Tuổi</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Chức vụ</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  {item.role === UserRole.ADMIN && "Quản trị viên"}{" "}
                  {item.role === UserRole.EMPLOYEE && "Nhân viên"}
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
                      onClick={() => setViewId(item.id)}
                    >
                      Chi tiết
                    </MenuItem>
                    <MenuItem
                      icon={<AiOutlineDelete />}
                      onClick={() => setDeleteId(item.id)}
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
      <ModalCreateUser visible={createVisible} onClose={setCreateVisible.off} />
      <ModalViewUser
        id={viewId}
        visible={!!viewId}
        onClose={() => setViewId(undefined)}
      />
      <ModalDeleteUser
        id={deleteId}
        visible={!!deleteId}
        onClose={() => setDeleteId(undefined)}
      />
    </div>
  )
}
