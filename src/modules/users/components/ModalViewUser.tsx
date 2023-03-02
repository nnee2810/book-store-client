import { useBoolean } from "@chakra-ui/hooks"
import Loading from "components/common/loading/Loading"
import Button from "components/core/Button"
import Field from "components/core/field"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { UserGender, UserRole } from "entities/user.entity"
import { useEffect } from "react"
import { FormProvider } from "react-hook-form"
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { useGetUser } from "../hooks/useGetUser"
import useUpdateUser from "../hooks/useUpdateUser"

interface ModalViewUserProps extends ModalBaseProps {
  id?: string
}

export default function ModalViewUser({ id, ...props }: ModalViewUserProps) {
  const {
    data,
    isLoading: isGetting,
    refetch,
  } = useGetUser(String(id), {
    enabled: false,
  })
  const [editMode, setEditMode] = useBoolean()
  const {
    methods,
    handleSubmit,
    isLoading: isUpdating,
  } = useUpdateUser(setEditMode.off)

  useEffect(() => {
    if (props.visible) {
      refetch()
      setEditMode.off()
    }
  }, [props.visible])
  useEffect(() => {
    if (data) methods.reset(data)
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Modal
          {...props}
          name="Chi tiết nhân viên"
          actions={
            data ? (
              editMode ? (
                <>
                  <Button
                    colorScheme="success"
                    isloading={isUpdating}
                    className="text-xl"
                  >
                    <AiOutlineCheck />
                  </Button>
                  <Button
                    type="button"
                    colorScheme="error"
                    disabled={isUpdating}
                    className="text-xl"
                    onClick={() => {
                      methods.reset()
                      setEditMode.off()
                    }}
                  >
                    <AiOutlineClose />
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  colorScheme="success"
                  className="text-xl"
                  onClick={setEditMode.on}
                >
                  <AiOutlineEdit />
                </Button>
              )
            ) : null
          }
          disabled={isUpdating}
        >
          {isGetting && <Loading />}
          {data && (
            <>
              <div className="text-blue-500 font-medium">Thông tin cá nhân</div>
              <Field
                variant="text"
                name="name"
                label="Họ tên"
                disabled={!editMode}
              />
              <Field
                variant="text"
                type="number"
                name="age"
                label="Tuổi"
                disabled={!editMode}
              />
              <Field
                variant="select"
                name="gender"
                label="Giới tính"
                options={[
                  {
                    label: "Nam",
                    value: UserGender.MALE,
                  },
                  {
                    label: "Nữ",
                    value: UserGender.FEMALE,
                  },
                ]}
                disabled={!editMode}
              />
              <Field
                variant="text"
                name="phone"
                label="Số điện thoại"
                disabled={!editMode}
              />
              <Field
                variant="text"
                name="address"
                label="Địa chỉ"
                disabled={!editMode}
              />
              <Field
                variant="text"
                type="number"
                name="salary"
                label="Lương"
                disabled={!editMode}
              />
              <div className="text-blue-500 font-medium">
                Thông tin đăng nhập
              </div>
              <Field
                variant="text"
                name="username"
                label="Tên đăng nhập"
                disabled={!editMode}
              />
              <Field
                variant="text"
                type="password"
                name="password"
                label="Mật khẩu"
                disabled={!editMode}
              />
              <Field
                variant="select"
                name="role"
                label="Chức vụ"
                options={[
                  {
                    label: "Nhân viên",
                    value: UserRole.EMPLOYEE,
                  },
                  {
                    label: "Quản trị viên",
                    value: UserRole.ADMIN,
                  },
                ]}
                disabled={!editMode}
              />
            </>
          )}
        </Modal>
      </form>
    </FormProvider>
  )
}
