import Button from "components/core/Button"
import Field from "components/core/field"
import { FormProvider } from "react-hook-form"
import useSignIn from "../hooks/useSignIn"

export default function SignIn() {
  const { methods, handleSubmit, isLoading } = useSignIn()

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="bg-[url('/images/sign-in-bg.jpg')] bg-cover "></div>
      <div className="flex justify-center items-center">
        <div className="max-w-sm w-full space-y-8">
          <div>
            <div className="text-blue-500 text-xl font-bold">ĐĂNG NHẬP</div>
            <div className="text-lg">Hệ thống quản lý cửa hàng</div>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
              <Field variant="text" name="username" label="Tên đăng nhập" />
              <Field
                variant="text"
                name="password"
                type="password"
                label="Mật khẩu"
              />
              <Button colorScheme="primary" fullWidth isloading={isLoading}>
                Đăng nhập
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
