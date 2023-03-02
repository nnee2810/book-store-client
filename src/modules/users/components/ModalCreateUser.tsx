import Button from "components/core/Button"
import Field from "components/core/field"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { UserGender, UserRole } from "entities/user.entity"
import { FormProvider } from "react-hook-form"
import useCreateUser from "../hooks/useCreateUser"

export default function ModalCreateUser(props: ModalBaseProps) {
  const { methods, handleSubmit, isLoading } = useCreateUser(props.onClose)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Modal
          {...props}
          name="Thêm nhân viên"
          actions={
            <Button colorScheme="success" isloading={isLoading}>
              Thêm
            </Button>
          }
          disabled={isLoading}
        >
          <div className="text-blue-500 font-medium">Thông tin cá nhân</div>
          <Field variant="text" name="name" label="Họ tên" />
          <Field variant="text" type="number" name="age" label="Tuổi" />
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
          />
          <Field variant="text" name="phone" label="Số điện thoại" />
          <Field variant="text" name="address" label="Địa chỉ" />
          <Field variant="text" type="number" name="salary" label="Lương" />
          <div className="text-blue-500 font-medium">Thông tin đăng nhập</div>
          <Field variant="text" name="username" label="Tên đăng nhập" />
          <Field
            variant="text"
            type="password"
            name="password"
            label="Mật khẩu"
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
          />
        </Modal>
      </form>
    </FormProvider>
  )
}
