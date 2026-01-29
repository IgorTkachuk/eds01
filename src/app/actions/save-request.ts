"use server";

import { formSchema } from "@/forms/schema";
import { db } from "@/db/drizzle";
import { request } from "@/db/schema";

export async function saveRequestAction(data: unknown) {
  const values = formSchema.parse(data);

  await db.insert(request).values({
    streetId: values.streetId,
    settlementId: values.settlementId,
    rqCharacterId: values.rqCharacterId,
    rqFactId: values.rqFactId,
    inputdate: values.inputDT,
    finishdate: values.finishDT,
    diameterId: values.diameterId,
    materialId: values.materialId,
    pipeLayingTypeId: values.pipeLayingTypeId,
    pressureId: values.pressureId,
    buildingNumber: values.buildingNumber,
    customerFullName: values.customerFullName,
    customerPhoneNumber: values.customerPhoneNumber,
    completedWork: values.complitedWork,
    notes: values.notes,
    performer: values.performer,
    userId: values.userId
  });

  return { success: true };
}
