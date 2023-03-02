import { AxiosError } from "axios"
import { Message } from "configs/constants"
import toast from "react-hot-toast"

export function getApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || Message.INTERNAL_SERVER_ERROR
  }
  return Message.INTERNAL_SERVER_ERROR
}

export function handleApiError(error: unknown) {
  toast.error(getApiError(error))
}
