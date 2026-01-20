"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Control, useController } from "react-hook-form";
import { FormValues } from "@/forms/schema";

interface Item {
  id: number;
  name: string | null;
}

interface Props {
  control: Control<FormValues>;
  fieldName: keyof FormValues;
  caption: string;
  placeholder: string;
  action: () => Promise<Item[]>;
}

export function RqSelect({
  control,
  fieldName,
  caption,
  placeholder,
  action,
}: Props) {
  // const characters = use(getRqCharacter());
  const { field, fieldState } = useController({
    name: fieldName,
    control,
  });
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    action().then(setItems);
  }, []);

  return (
    <>
      <Label htmlFor='rqCharacter'>{caption}</Label>
      <Select
        onValueChange={(rqCharacter) => {
          field.onChange(Number(rqCharacter));
        }}
      >
        <SelectTrigger
          className={cn(
            "w-75 justify-between",
            fieldState.error && "border-destructive",
          )}
          id='rqCharacter'
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{caption}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldState.error && (
        <p className='text-destructive text-sm mt-1'>
          {fieldState.error.message}
        </p>
      )}
    </>
  );
}
