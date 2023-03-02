import { MessageParams } from "yup/lib/types"

enum ValidateMessage {
  REQUIRED = "không được để trống",
  INVALID = "không hợp lệ",
  MAX_LENGTH = "có dộ dài tối đa",
  NOT_MATCH = "không khớp",
}

export function requiredMessage({ label }: MessageParams) {
  return [label, ValidateMessage.REQUIRED].join(" ")
}

export function invalidMessage({ label }: MessageParams) {
  return [label, ValidateMessage.INVALID].join(" ")
}

export function maxLengthMessage({
  label,
  max,
}: MessageParams & { max: number }) {
  return [label, ValidateMessage.MAX_LENGTH, max, "kí tự"].join(" ")
}

export function notMatchMessage({ label }: MessageParams) {
  return [label, ValidateMessage.NOT_MATCH].join(" ")
}
