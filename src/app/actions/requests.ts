"use server";

import { db } from "@/db/drizzle";
import { performer, Request, request, settlement, street } from "@/db/schema";
import { eq } from "drizzle-orm";
import { success } from "zod";

export async function getRequests(userId: string) {
  try {
    const allRequests = await db
      .select()
      .from(request)
      .leftJoin(street, eq(street.id, request.streetId))
      .leftJoin(settlement, eq(settlement.id, request.settlementId))
      .leftJoin(performer, eq(performer.id, request.performer))
      .where(eq(request.userId, userId));
    return allRequests;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function removeRequest(requestId: number) {
  try {
    await db.delete(request).where(eq(request.id, requestId));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
    // throw error;
  }
}


export async function updateRequest(data: Request) {
  try {
    await db
      .update(request)
      .set({
        streetId: data.streetId,
        settlementId: data.settlementId,
        rqCharacterId: data.rqCharacterId,
        rqFactId: data.rqFactId,
        inputdate: data.inputdate,
        finishdate: data.finishdate,
        diameterId: data.diameterId,
        materialId: data.materialId,
        pipeLayingTypeId: data.pipeLayingTypeId,
        pressureId: data.pressureId,
        buildingNumber: data.buildingNumber,
        customerFullName: data.customerFullName,
        customerPhoneNumber: data.customerPhoneNumber,
        completedWork: data.completedWork,
        notes: data.notes,
        performer: data.performer,
      })
      .where(eq(request.id, data.id));
    
      return {success: true}
  } catch (error) {
    console.error(error);
    return {success: false}
    
  }
}