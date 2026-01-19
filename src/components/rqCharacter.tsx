"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getRqCharacter } from "@/app/actions/rq-character";
import { Character } from "@/db/schema";

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

export function RqCharacter({ control }: Props) {
  // const characters = use(getRqCharacter());
  const { field, fieldState } = useController({
    name: "rqCharacterId",
    control,
  });
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getRqCharacter().then(setCharacters);
  }, []);

  return (
    <>
      <Label htmlFor='rqCharacter'>Характер заявки</Label>
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
          <SelectValue placeholder='Оберіть характер заявки' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Характер</SelectLabel>
            {characters.map((characer) => (
              <SelectItem key={characer.id} value={characer.id.toString()}>
                {characer.name}
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
