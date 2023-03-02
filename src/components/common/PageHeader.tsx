import { ReactNode } from "react"

interface PageHeaderProps {
  name: string
  actions?: ReactNode
}

export default function PageHeader({ name, actions }: PageHeaderProps) {
  return (
    <div className="flex justify-between mb-8">
      <div className="text-2xl font-medium">{name}</div>
      {actions}
    </div>
  )
}
