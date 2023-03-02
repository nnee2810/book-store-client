import Button from "components/core/Button"
import Field from "components/core/field"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { FormProvider } from "react-hook-form"
import useCreateProduct from "../hooks/useCreateProduct"

export default function ModalCreateProduct(props: ModalBaseProps) {
  const { methods, handleSubmit, isLoading } = useCreateProduct(props.onClose)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Modal
          {...props}
          name="Thêm sản phẩm"
          disabled={isLoading}
          actions={
            <Button colorScheme="success" isloading={isLoading}>
              Thêm
            </Button>
          }
        >
          <Field variant="text" name="name" label="Tên" />
          <Field variant="text" name="author" label="Tác giả" />
          <Field variant="text" name="genre" label="Thể loại" />
          <Field variant="text" name="publisher" label="Nhà xuất bản" />
          <Field variant="text" type="number" name="price" label="Giá" />
          <Field
            variant="text"
            type="number"
            name="quantity"
            label="Số lượng"
          />
        </Modal>
      </form>
    </FormProvider>
  )
}
