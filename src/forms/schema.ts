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
});

export type FormValues = z.infer<typeof formSchema>;

// export const formSettlementSchema = z.object({
//   streetId: z.number({
//     message: "Оберіть населенний пункт!",
//   }),
// });

// export type FormSettlementValues = z.infer<typeof formSettlementSchema>;
