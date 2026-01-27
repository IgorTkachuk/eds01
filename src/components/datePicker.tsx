"use client";

// import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { uk } from "react-day-picker/locale";
import { Control, useController } from "react-hook-form";
import { FormValues } from "@/forms/schema";

interface Props {
  control: Control<FormValues>;
  fieldName: keyof FormValues;
  caption: string;
}

export function DatePicker({ control, fieldName, caption }: Props) {
  const { field, fieldState } = useController({
    name: fieldName,
    control,
  });

  // const [date, setDate] = useState<Date>();
  const date = field.value as Date | undefined;

  function handleTime(time: string): void {
    if (!field.value) return;

    const [hours, minutes, seconds = 0] = time.split(":").map(Number);

    const newDate = new Date(field.value);
    newDate.setHours(hours, minutes, seconds);

    field.onChange(newDate);
  }

  return (
    <div className='mb-4'>
      <div className='flex'>
        <div className='mr-4'>
          <Popover>
            <Label htmlFor='date-picker' className='px-1 mb-3'>
              Дата {caption}
            </Label>
            <PopoverTrigger asChild id='date-picker'>
              <Button
                variant='outline'
                data-empty={!date}
                className={cn(
                  "data-[empty=true]:text-muted-foreground w-41 justify-start text-left font-normal",
                  fieldState.error && "border-destructive",
                )}
                id='date-picker'
              >
                <CalendarIcon />
                {date ? (
                  format(date, "PPP", { locale: uk })
                ) : (
                  <span>Оберіть дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={(date) => {
                  // setDate(date);
                  field.onChange(date);
                }}
                locale={uk}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='time-picker' className='px-1'>
            Час {caption}
          </Label>
          <Input
            type='time'
            id='time-picker'
            step='1'
            // defaultValue='10:30:00'
            value={date ? format(date, "HH:mm:ss") : ""}
            className='w-30 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            onChange={(e) => handleTime(e.target.value)}
          />
        </div>
      </div>
      {fieldState.error && (
        <p className='text-destructive text-sm mt-1'>
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
