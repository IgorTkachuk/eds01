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
import { RqFact } from "@/components/rqFact";

import { saveRequestAction } from "../actions/save-request";
import { useTransition } from "react";

export default function StreetForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetId: undefined,
      settlementId: undefined,
      rqCharacterId: undefined,
      rqFactId: undefined,
    },
  });

  const [pending, startTransition] = useTransition();
  
  function onSubmit(values: FormValues) {
    startTransition(async () =>{
      const res = await saveRequestAction(values)
      console.log("Збережено", res);
      
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-4'>
        <StreetSelect control={form.control} search={searchStreet} />
        <SettlementSelect control={form.control} search={searchSettlement} />
        <RqCharacter control={form.control}/>
        <RqFact control={form.control}/>
        <Button type='submit' disabled={pending}>
          {pending ? "Зберпеження..." :  "Зберегти"}
        </Button>
      </form>
    </Form>
  );
}
