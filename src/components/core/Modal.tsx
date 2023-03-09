import clsx from "clsx"
import { PropsWithChildren, ReactNode } from "react"
import Button from "./Button"

export interface ModalBaseProps {
  visible: boolean
  onClose: () => void
}

interface ModalProps extends ModalBaseProps {
  name: string
  actions?: ReactNode
  disabled?: boolean
  className?: string
}
export default function Modal({
  visible,
  onClose,
  name,
  actions,
  disabled,
  className,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={clsx("modal", {
        "visible opacity-100 pointer-events-auto": visible,
      })}
    >
      <div className={clsx("modal-box", className)}>
        <div className="text-xl font-medium">{name}</div>
        <div className="py-4">{children}</div>
        <div className="flex justify-end gap-2">
          {actions}
          <Button type="button" outline disabled={disabled} onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  )
}
