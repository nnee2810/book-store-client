import Loading from "components/common/loading/Loading"
import TextInput from "components/core/field/TextInput"
import Modal, { ModalBaseProps } from "components/core/Modal"
import { takePerPage } from "configs/constants"
import { ProductEntity } from "entities/product.entity"
import useQueryParams from "hooks/useQueryParams"
import debounce from "lodash.debounce"
import { ChangeEvent } from "react"
import { GetProductsDto } from "../dto/get-products.dto"
import useGetProducts from "../hooks/useGetProducts"

interface ModalSelectProductProps extends ModalBaseProps {
  onSelect: (product: ProductEntity) => void
}

export default function ModalSelectProduct({
  onSelect,
  ...props
}: ModalSelectProductProps) {
  const { queryParams, updateQueryParams } = useQueryParams<GetProductsDto>({
    skip: 0,
    take: takePerPage,
  })
  const { data, isLoading } = useGetProducts(queryParams)

  const handleChangeSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    updateQueryParams({
      name: e.target.value,
    })
  }, 300)

  const handleSelect = (product: ProductEntity) => {
    onSelect(product)
    props.onClose()
  }

  return (
    <Modal {...props} name="Chọn sản phẩm" className="max-w-xl w-full ">
      <div className="space-y-4">
        <TextInput placeholder="Tìm kiếm..." onChange={handleChangeSearch} />
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => (
              <tr
                className="cursor-pointer hover:text-blue-500"
                onClick={handleSelect.bind(null, item)}
                key={item.id}
              >
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <Loading />}
      </div>
    </Modal>
  )
}
