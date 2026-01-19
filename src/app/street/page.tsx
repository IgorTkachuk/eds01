"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { StreetSelect } from "@/components/searchStreet_m1";
import { formSchema, FormValues } from "@/forms/schema";

import { searchStreet } from "../actions/search-street";
import { SettlementSelect } from "@/components/searchSettlement";
import { searchSettlement } from "../actions/search-settlement";

import { RqCharacter } from "@/components/rqCharacter";

export default function StreetForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetId: undefined,
      settlementId: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-4'>
        <StreetSelect control={form.control} search={searchStreet} />
        <SettlementSelect control={form.control} search={searchSettlement} />
        <RqCharacter />
        <Button type='submit'>Зберегти</Button>
      </form>
    </Form>
  );
}
