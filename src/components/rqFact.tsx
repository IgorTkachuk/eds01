"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getRqFact } from "@/app/actions/rq-fact";
import { Fact } from "@/db/schema";

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

interface Props {
  control: Control<FormValues>;
}

export function RqFact({ control }: Props) {
  // const characters = use(getRqCharacter());
  const { field, fieldState } = useController({
    name: "rqFactId",
    control,
  });
  const [facts, setFacts] = useState<Fact[]>([]);

  useEffect(() => {
    getRqFact().then(setFacts);
  }, []);

  return (
    <>
      <Label htmlFor='rqFact'>Фактична причина заявки</Label>
      <Select
        onValueChange={(rqFact) => {
          field.onChange(Number(rqFact));
        }}
      >
        <SelectTrigger
          className={cn(
            "w-75 justify-between",
            fieldState.error && "border-destructive",
          )}
          id='rqFact'
        >
          <SelectValue placeholder='Оберіть фактичну причину заявки' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Фактична причина</SelectLabel>
            {facts.map((fact) => (
              <SelectItem key={fact.id} value={fact.id.toString()}>
                {fact.name}
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
