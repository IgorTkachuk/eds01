"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Item = {
  id: number
  name: string
}

export function AsyncStreetSelect() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<Item | null>(null)
  const [items, setItems] = React.useState<Item[]>([])
  const [loading, setLoading] = React.useState(false)

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const search = (q: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      if (q.length < 2) {
        setItems([])
        return
      }

      setLoading(true)
      const res = await fetch(`/api/streets?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setItems(data)
      setLoading(false)
    }, 400)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-75 justify-between"
        >
          {value ? value.name : "Оберіть вулицю..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-75 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Почніть вводити..."
            onValueChange={search}
          />

          <CommandEmpty>
            {loading ? "Завантаження..." : "Нічого не знайдено"}
          </CommandEmpty>

          <CommandGroup>
            {items.map(item => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => {
                  setValue(item)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.id === item.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
