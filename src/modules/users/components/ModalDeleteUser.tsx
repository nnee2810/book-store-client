import { useQueryClient } from "@tanstack/react-query"
import Button from "components/core/Button"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { toast } from "react-hot-toast"
import useDeleteUser from "../hooks/useDeleteUser"

interface ModalDeleteUserProps extends ModalBaseProps {
  id?: string
}

export default function ModalDeleteUser({
  id,
  ...props
}: ModalDeleteUserProps) {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useDeleteUser()

  const handleDelete = () => {
    if (!id) return
    mutate(id, {
      onSuccess() {
        props.onClose()
        toast.success("Xóa nhân viên thành công")
        queryClient.invalidateQueries(["get-users"])
      },
    })
  }

  return (
    <Modal
      {...props}
      name="Xóa nhân viên"
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
      Bạn có chắc chắn muốn xóa nhân viên này không?
    </Modal>
  )
}
