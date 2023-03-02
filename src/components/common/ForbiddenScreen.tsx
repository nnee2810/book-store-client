import Button from "components/core/Button"
import { Link } from "react-router-dom"

export default function ForbiddenScreen() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-4xl font-bold text-blue">403</div>
      <div>Bạn không có quyền truy cập vào trang này!</div>
      <Link to="/">
        <Button className="mt-4" outline>
          Trang chủ
        </Button>
      </Link>
    </div>
  )
}
