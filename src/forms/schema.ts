import { z } from "zod";

export const formSchema = z
  .object({
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
      message: "Вкажіть номер будівлі",
    }),
    customerFullName: z.string({
      message: "Вкажіть ПІБ споживача",
    }),
    customerPhoneNumber: z.string({
      message: "Вкажіть номер телефону споживача",
    }),
    complitedWork: z.string({
      message: "Вкажіть виконані роботи",
    }),
    notes: z.string(),
    performer: z.number(),
    userId: z.string(),
  })
  // .refine((data) => data.finishDT > data.inputDT, {
  //   message: "Дата виконання заявки повинна бути пізніше за дату прийняття",
  //   path: ["finishDT"],
  // });
  .superRefine((data, ctx) => {
    if (data.finishDT <= data.inputDT) {
      ctx.addIssue({
        path: ["finishDT"],
        message: "Дата виконання заявки повинна бути пізніше за дату прийняття",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.finishDT > new Date()) {
      ctx.addIssue({
        path: ["finishDT"],
        message: "Дата не може бути в майбутньому",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormValues = z.infer<typeof formSchema>;
