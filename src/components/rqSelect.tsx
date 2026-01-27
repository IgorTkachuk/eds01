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
  className?: string;
}

export function RqSelect({
  control,
  fieldName,
  caption,
  placeholder,
  action,
  className,
}: Props) {
  // const characters = use(getRqCharacter());
  const { field, fieldState } = useController({
    name: fieldName,
    control,
  });
  const [items, setItems] = useState<Item[]>([]);

  console.log(field.name, field.value);

  // const [selectKey, setSelectKey] = useState(0);

  // useEffect(() => {
  //   action().then(setItems);
  // }, [action]);

  // useEffect(() => {
  //   if (field.value === undefined) {
  //     setSelectKey((k) => k + 1);
  //   }
  // }, [field.value]);

  useEffect(() => {
    let isMounted = true;
    action().then((data) => {
      if (isMounted) setItems(data);
    });
    return () => {
      isMounted = false;
    };
  }, [action]);

  return (
    <div className='mb-4'>
      <Label htmlFor={field.name} className='mb-2'>
        {caption}
      </Label>
      <Select
        // value={field.value != null ? String(field.value) : undefined}
        value={String(field.value ?? "")}
        onValueChange={(val) => field.onChange(Number(val))}
      >
        <SelectTrigger
          className={cn(
            "w-75 justify-between",
            className,
            fieldState.error && "border-destructive",
          )}
          id={field.name}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{caption}</SelectLabel>
            {/* <SelectItem value=''>— Оберіть —</SelectItem> */}
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
    </div>
  );
}
