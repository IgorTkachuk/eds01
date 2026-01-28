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

import {
  getSettlemetById,
  SettlementDTO,
} from "@/app/actions/search-settlement";
import { FormValues } from "@/forms/schema";
import { useEffect, useRef, useState } from "react";

interface Props {
  control: Control<FormValues>;
  search: (term: string) => Promise<SettlementDTO[]>;
}

export function SettlementSelect({ control, search }: Props) {
  const { field, fieldState } = useController({
    name: "settlementId",
    control,
  });

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SettlementDTO[]>([]);
  // const [selected, setSelected] = useState<SettlementDTO | null>(null);

  useEffect(() => {
    async function loadSelected() {
      if (!field.value) return;

      const settlement = await getSettlemetById(field.value);
      if (!settlement) return;

      setItems((prev) => {
        if (prev.some((i) => i.id === settlement.id)) return prev;
        return [settlement, ...prev];
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
      <FormLabel>Населенний пункт</FormLabel>
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
              {selected?.name ?? "Оберіть населений пункт"}
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
                {items.map((settlement) => (
                  <CommandItem
                    key={settlement.id}
                    value={settlement.id.toString()}
                    onSelect={() => {
                      // setSelected(settlement);
                      field.onChange(settlement.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        settlement.id === field.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {settlement.name}
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
