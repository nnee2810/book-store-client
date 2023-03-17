import { SelectOption } from "interfaces/select-option.interface"
import { useEffect, useState } from "react"
import Button from "./Button"

interface ButtonGroupProps<T> {
  options: SelectOption<T>[]
  colorScheme?: "primary" | "success" | "warning" | "error"
  onChange?: (selected?: SelectOption<T>) => void
}

export default function ButtonGroup<T = unknown>({
  options,
  colorScheme,
  onChange,
}: ButtonGroupProps<T>) {
  const [selected, setSelected] = useState<SelectOption<T>>()

  useEffect(() => {
    onChange?.(selected)
  }, [selected])

  return (
    <div className="btn-group">
      {options.map((item, idx) => (
        <Button
          colorScheme={colorScheme}
          outline={item.value !== selected?.value}
          onClick={setSelected.bind(
            null,
            item.value === selected?.value ? undefined : item,
          )}
          key={idx}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
