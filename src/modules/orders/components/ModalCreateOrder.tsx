import { useBoolean } from "@chakra-ui/hooks"
import Button from "components/core/Button"
import Field from "components/core/field"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { ProductEntity } from "entities/product.entity"
import ModalSelectProduct from "modules/products/components/ModalSelectProduct"
import { Fragment } from "react"
import { FormProvider } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AiOutlineDelete } from "react-icons/ai"
import useCreateOrder from "../hooks/useCreateOrder"

interface ModalCreateOrderProps extends ModalBaseProps {
  onSuccess?: (id: string) => void
}

export default function ModalCreateOrder({
  onSuccess,
  ...props
}: ModalCreateOrderProps) {
  const [selectProductVisible, setSelectProductVisible] = useBoolean()
  const { methods, fieldMethods, handleSubmit, isLoading } = useCreateOrder(
    (id: string) => {
      props.onClose()
      onSuccess?.(id)
    },
  )

  const handleSelectProduct = (product: ProductEntity) => {
    if (
      fieldMethods.fields.findIndex((field) => field.productId === product.id) >
      -1
    )
      toast.error("Đã thêm sản phẩm này")
    else
      fieldMethods.append({
        productId: product.id,
        quantity: 1,
        productName: product.name,
      })
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Modal
            {...props}
            name="Thêm đơn hàng"
            actions={
              <Button colorScheme="success" isloading={isLoading}>
                Thêm
              </Button>
            }
            disabled={isLoading}
          >
            <Field
              variant="select"
              name="type"
              label="Loại"
              options={[
                {
                  label: "Bán hàng",
                  value: "SELL",
                },
                {
                  label: "Nhập hàng",
                  value: "BUY",
                },
              ]}
            />
            {!!fieldMethods.fields.length && (
              <div className="grid grid-cols-[1fr_140px_auto] gap-x-2 gap-y-1 r">
                <div>Sản phẩm</div>
                <div>Số lượng</div>
                <div></div>
                {fieldMethods.fields.map((field, idx) => (
                  <Fragment key={field.id}>
                    <Field
                      variant="text"
                      name={`items.${idx}.productName`}
                      disabled
                    />
                    <Field
                      variant="text"
                      type="number"
                      name={`items.${idx}.quantity`}
                    />
                    <div
                      className="pt-3 text-2xl cursor-pointer"
                      onClick={fieldMethods.remove.bind(null, idx)}
                    >
                      <AiOutlineDelete />
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
            <Button
              type="button"
              colorScheme="primary"
              fullWidth
              onClick={setSelectProductVisible.on}
            >
              Thêm sản phẩm
            </Button>
          </Modal>
        </form>
      </FormProvider>
      <ModalSelectProduct
        visible={selectProductVisible}
        onClose={setSelectProductVisible.off}
        onSelect={handleSelectProduct}
      />
    </>
  )
}
