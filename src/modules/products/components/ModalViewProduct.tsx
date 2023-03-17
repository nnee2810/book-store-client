import { useBoolean } from "@chakra-ui/hooks"
import Loading from "components/common/loading/Loading"
import Button from "components/core/Button"
import Field from "components/core/field"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { useEffect } from "react"
import { FormProvider } from "react-hook-form"
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import useGetProduct from "../hooks/useGetProduct"
import useUpdateProduct from "../hooks/useUpdateProduct"

interface ModalViewProductProps extends ModalBaseProps {
  id?: string
}

export default function ModalViewProduct({
  id,
  ...props
}: ModalViewProductProps) {
  const {
    data,
    isLoading: isGetting,
    refetch,
  } = useGetProduct(String(id), {
    enabled: false,
  })
  const [editMode, setEditMode] = useBoolean()
  const {
    methods,
    handleSubmit,
    isLoading: isUpdating,
  } = useUpdateProduct(setEditMode.off)

  useEffect(() => {
    if (props.visible) {
      refetch()
      setEditMode.off()
    }
  }, [props.visible])
  useEffect(() => {
    if (data) {
      const { createdAt, updatedAt, ...restData } = data
      methods.reset(restData)
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Modal
          {...props}
          name="Chi tiết sản phẩm"
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
              <Field
                variant="text"
                name="name"
                label="Tên"
                disabled={!editMode}
              />
              <Field
                variant="text"
                name="author"
                label="Tác giả"
                disabled={!editMode}
              />
              <Field
                variant="text"
                name="genre"
                label="Thể loại"
                disabled={!editMode}
              />
              <Field
                variant="text"
                name="publisher"
                label="Nhà xuất bản"
                disabled={!editMode}
              />
              <Field
                variant="text"
                type="number"
                name="price"
                label="Giá"
                disabled={!editMode}
              />
              <Field
                variant="text"
                type="number"
                name="quantity"
                label="Số lượng"
                disabled={!editMode}
              />
            </>
          )}
        </Modal>
      </form>
    </FormProvider>
  )
}
