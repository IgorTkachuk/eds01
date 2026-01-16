import { z } from "zod";

export const formSchema = z.object({
  streetId: z.number({
    message: "Оберіть вулицю!",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
