"use client";

import { useController, Control } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { getStreetById, StreetDTO } from "@/app/actions/search-street";
import { FormValues } from "@/forms/schema";
import { useEffect, useRef, useState } from "react";

interface Props {
  control: Control<FormValues>;
  search: (term: string) => Promise<StreetDTO[]>;
}

export function StreetSelect({ control, search }: Props) {
  const { field, fieldState } = useController({
    name: "streetId",
    control,
  });

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<StreetDTO[]>([]);
  // const [selected, setSelected] = useState<StreetDTO | null>(null);

  useEffect(() => {
    async function loadSelected() {
      if (!field.value) return;

      const street = await getStreetById(field.value);
      if (!street) return;

      setItems((prev) => {
        if (prev.some((i) => i.id === street.id)) return prev;
        return [street, ...prev];
      });
    }

    loadSelected();
  }, [field.value]);

  const selected = items.find((i) => i.id === field.value) ?? null;
  const [loading, setLoading] = useState(false);

  const requestId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(term: string) {
    const currentId = ++requestId.current;

    if (term.length < 2) {
      setItems([]);
      return;
    }

    setLoading(true);
    const result = await search(term);

    if (currentId !== requestId.current) return;

    setItems(result);
    setLoading(false);
  }

  return (
    <FormItem className='mb-4'>
      <FormLabel>Вулиця</FormLabel>
      <Popover
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (v) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }
        }}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              role='combobox'
              className={cn(
                "w-75 justify-between font-normal",
                fieldState.error && "border-destructive",
              )}
            >
              {selected?.name ?? "Оберіть вулицю"}
              <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-75 p-0'>
          <Command shouldFilter={false}>
            <CommandInput
              ref={inputRef}
              placeholder='Почніть вводити...'
              onValueChange={handleSearch}
              autoFocus
            />
            <CommandList>
              <CommandEmpty>
                {loading ? "Завантаження" : "Нічого не знайдено"}
              </CommandEmpty>
              <CommandGroup>
                {items.map((street) => (
                  <CommandItem
                    key={street.id}
                    // value={street.name}
                    value={String(street.id)}
                    onSelect={() => {
                      // setSelected(street);
                      field.onChange(street.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        street.id === field.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {street.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {fieldState.error && (
        <p className='text-destructive text-sm mt-1'>
          {fieldState.error.message}
        </p>
      )}
    </FormItem>
  );
}
