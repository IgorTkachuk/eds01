import { z } from "zod";

export const formSchema = z.object({
  streetId: z.number({
    message: "Оберіть вулицю!",
  }),
  settlementId: z.number({
    message: "Оберіть населенний пункт!",
  }),
  rqCharacterId: z.number({
    message: "Оберіть характер заявки!",
  }),
  rqFactId: z.number({
    message: "Оберіть фактичну причину заявки!",
  }),
  inputDT: z.date({
    message: "Вкажіть дату та час прийому заявки!",
  }),
  finishDT: z.date({
    message: "Вкажіть дату та час виконання заявки!",
  }),
  diameterId: z.number({
    message: "Вкажіть діаметер",
  }),
  materialId: z.number({
    message: "Вкажіть матеріал",
  }),
  pipeLayingTypeId: z.number({
    message: "Вкажіть розташування",
  }),
  pressureId: z.number({
    message: "Вкажіть тиск",
  }),
  buildingNumber: z.string({
    message: "Вкажіть номер будівлі"
  }),
  // customerFullName: z.string({
  //   message: "Вкажіть ПІБ споживача"
  // }),
  // customerPhoneNumber: z.string({
  //   message: "Вкажіть номер телефону споживача"
  // }),
  // complitedWork: z.string({
  //   message: "Вкажіть виконані роботи"
  // }),
  // notes: z.string()
});

export type FormValues = z.infer<typeof formSchema>;
