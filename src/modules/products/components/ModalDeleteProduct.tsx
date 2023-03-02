import { useQueryClient } from "@tanstack/react-query"
import Button from "components/core/Button"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { toast } from "react-hot-toast"
import useDeleteProduct from "../hooks/useDeleteProduct"

interface ModalDeleteProductProps extends ModalBaseProps {
  id?: string
}

export default function ModalDeleteProduct({
  id,
  ...props
}: ModalDeleteProductProps) {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useDeleteProduct()

  const handleDelete = () => {
    if (!id) return
    mutate(id, {
      onSuccess() {
        props.onClose()
        toast.success("Xóa sản phẩm thành công")
        queryClient.invalidateQueries(["get-users"])
      },
    })
  }

  return (
    <Modal
      {...props}
      name="Xóa sản phẩm"
      disabled={isLoading}
      actions={
        <Button
          colorScheme="error"
          isloading={isLoading}
          onClick={handleDelete}
        >
          Xóa
        </Button>
      }
    >
      Bạn có chắc chắn muốn xóa sản phẩm này không?
    </Modal>
  )
}
