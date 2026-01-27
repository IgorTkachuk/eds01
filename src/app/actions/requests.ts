"use server";

import { db } from "@/db/drizzle";
import { performer, request, settlement, street } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getRequests() {
  try {
    const allRequests = await db
      .select()
      .from(request)
      .leftJoin(street, eq(street.id, request.streetId))
      .leftJoin(settlement, eq(settlement.id, request.settlementId))
      .leftJoin(performer, eq(performer.id, request.performer));
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
