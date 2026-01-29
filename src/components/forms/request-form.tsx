"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { StreetSelect } from "@/components/searchStreet_m1";
import { formSchema, FormValues } from "@/forms/schema";

import { searchStreet } from "@/app/actions/search-street";
import { SettlementSelect } from "@/components/searchSettlement";
import { searchSettlement } from "@/app/actions/search-settlement";

import { saveRequestAction } from "@/app/actions/save-request";
import { useTransition } from "react";
import { DatePicker } from "@/components/datePicker";
import { RqSelect } from "@/components/rqSelect";
import { getRqCharacter } from "@/app//actions/rq-character";
import { getRqFact } from "@/app/actions/rq-fact";
import { getDiameter } from "@/app/actions/search-diameter";
import { getMaterial } from "@/app/actions/search-material";
import { getPressure } from "@/app/actions/search-pressure";
import { getPipeLayingType } from "@/app/actions/search-pipe-laying";
import { RqInput } from "@/components/rqInput";
import { RqTextarea } from "@/components/rqTextarea";
import { getPerformer } from "@/app/actions/search-performer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Request } from "@/db/schema";
import { updateRequest } from "@/app/actions/requests";

// import { DevTool } from "@hookform/devtools";
import { Loader2 } from "lucide-react";

interface RequestFormProps {
  request?: Request;
  userId?: string;
}

export default function RequestForm({ request, userId }: RequestFormProps) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetId: request?.streetId || undefined,
      settlementId: request?.settlementId || undefined,
      rqCharacterId: request?.rqCharacterId || undefined,
      rqFactId: request?.rqFactId || undefined,
      inputDT: request?.inputdate || undefined,
      finishDT: request?.finishdate || undefined,
      buildingNumber: request?.buildingNumber || "",
      customerFullName: request?.customerFullName || "",
      customerPhoneNumber: request?.customerPhoneNumber || "",
      complitedWork: request?.completedWork || "",
      notes: request?.notes || "",
      performer: request?.performer || undefined,
      diameterId: request?.diameterId || undefined,
      materialId: request?.materialId || undefined,
      pressureId: request?.pressureId || undefined,
      pipeLayingTypeId: request?.pipeLayingTypeId || undefined,
      userId: userId || undefined
    },
    mode: "onChange",
  });

  const [pending, startTransition] = useTransition();

  function onSubmit(values: FormValues) {
    let res;
    startTransition(async () => {
      if (request) {
        res = await updateRequest({
          ...values,
          inputdate: values.inputDT,
          finishdate: values.finishDT,
          completedWork: values.complitedWork,
          id: request.id,
          userId: userId!
        });
      } else {
        res = await saveRequestAction(values);
      }
      console.log("Збережено", res);

      if (res?.success) {
        toast.success(`Заявку ${request ? "оновлено" : "збережено"}`, {
          position: "bottom-right",
        });
        form.reset({
          ...values,
          inputDT: values.inputDT,
          finishDT: values.finishDT,
        });
        router.refresh();
      } else {
        toast.error(`Помилка ${request ? "оновлення" : "збереження"}`);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-4'>
          <div className='flex gap-20'>
            <div>
              <RqSelect
                fieldName='rqCharacterId'
                control={form.control}
                caption='Характер заявки'
                placeholder='оберіть характер заявки'
                action={getRqCharacter}
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
              <SettlementSelect
                control={form.control}
                search={searchSettlement}
              />
              <StreetSelect control={form.control} search={searchStreet} />
              <RqInput
                fieldName='buildingNumber'
                label='Номер будинку'
                placeholder=' № будинку'
                control={form.control}
                className='w-30'
              />
              <RqInput
                fieldName='customerFullName'
                label='ПІБ заявника'
                placeholder='ПІБ заявника'
                control={form.control}
                className='w-75'
              />
              <RqInput
                fieldName='customerPhoneNumber'
                label='Телефон'
                placeholder='телефон'
                control={form.control}
                className='w-75'
              />
            </div>
            <div>
              <RqSelect
                fieldName='rqFactId'
                control={form.control}
                caption='Фактична причина заявки'
                placeholder='оберіть фактичну причину'
                action={getRqFact}
              />

              <RqSelect
                fieldName='diameterId'
                control={form.control}
                caption='Діаметер'
                placeholder='діаметер'
                action={getDiameter}
                className='w-28'
              />

              <RqSelect
                fieldName='materialId'
                control={form.control}
                caption='Матеріал'
                placeholder='матеріал'
                action={getMaterial}
                className='w-30'
              />

              <RqSelect
                fieldName='pressureId'
                control={form.control}
                caption='Тиск'
                placeholder='тиск'
                action={getPressure}
                className='w-42'
              />

              <RqSelect
                fieldName='pipeLayingTypeId'
                control={form.control}
                caption='Розташування'
                placeholder='розташування'
                action={getPipeLayingType}
                className='w-53'
              />

              <RqTextarea
                fieldName='complitedWork'
                control={form.control}
                label='Виконані роботи'
                placeholder='Виконані роботи'
                className='w-75'
              />

              <RqTextarea
                fieldName='notes'
                control={form.control}
                label='Додаткові нотатки'
                placeholder='нотатки'
                className='w-75'
              />

              <RqSelect
                fieldName='performer'
                action={getPerformer}
                caption='Виконавець робіт'
                control={form.control}
                placeholder='виконавець робіт'
              />
            </div>
          </div>
          <Button type='submit' disabled={pending} className='w-50'>
            {pending ? (
              <>
                <Loader2 className='size-4 animate-spin' />
                Збереження...
              </>
            ) : (
              `${request ? "Оновити" : "Додати"} заявку`
            )}
          </Button>
        </form>
      </Form>
      {/* <DevTool control={form.control} /> */}
    </>
  );
}
