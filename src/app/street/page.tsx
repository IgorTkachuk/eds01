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

import { saveRequestAction } from "../actions/save-request";
import { useTransition } from "react";
import { DatePicker } from "@/components/datePicker";
import { RqSelect } from "@/components/rqSelect";
import { getRqCharacter } from "../actions/rq-character";
import { getRqFact } from "../actions/rq-fact";
import { getDiameter } from "../actions/search-diameter";
import { getMaterial } from "../actions/search-material";
import { getPressure } from "../actions/search-pressure";
import { getPipeLayingType } from "../actions/search-pipe-laying";
import { RqInput } from "@/components/rqInput";

export default function StreetForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetId: undefined,
      settlementId: undefined,
      rqCharacterId: undefined,
      rqFactId: undefined,
      inputDT: undefined,
      finishDT: undefined,
      buildingNumber: undefined,
      // customerFullName: undefined,
      // complitedWork: undefined,
      // notes: undefined
    },
  });

  const [pending, startTransition] = useTransition();

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const res = await saveRequestAction(values);
      console.log("Збережено", res);
    });
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-4'>
        <SettlementSelect control={form.control} search={searchSettlement} />
        <StreetSelect control={form.control} search={searchStreet} />
        <RqInput fieldName="buildingNumber" label="Номер будинку" placeholder=" № будинку" control={
          form.control
        } />
        <RqSelect
          fieldName='rqCharacterId'
          control={form.control}
          caption='Характер заявки'
          placeholder='оберіть характер заявки'
          action={getRqCharacter}
        />
        <RqSelect
          fieldName='rqFactId'
          control={form.control}
          caption='Фактична причина заявки'
          placeholder='оберіть фактичну причину'
          action={getRqFact}
        />
        <DatePicker
          control={form.control}
          fieldName='inputDT'
          caption='надходження'
        />
        <DatePicker
          control={form.control}
          fieldName='finishDT'
          caption='завершення'
        />
        <RqSelect
          fieldName='diameterId'
          control={form.control}
          caption='Діаметер'
          placeholder='діаметер'
          action={getDiameter}
        />

        <RqSelect
          fieldName='materialId'
          control={form.control}
          caption='Матеріал'
          placeholder='матеріал'
          action={getMaterial}
        />

        <RqSelect
          fieldName='pressureId'
          control={form.control}
          caption='Тиск'
          placeholder='тиск'
          action={getPressure}
        />

        <RqSelect
          fieldName='pipeLayingTypeId'
          control={form.control}
          caption='Розташування'
          placeholder='розташування'
          action={getPipeLayingType}
        />

        <Button type='submit' disabled={pending}>
          {pending ? "Збереження..." : "Зберегти"}
        </Button>
      </form>
    </Form>
  );
}
