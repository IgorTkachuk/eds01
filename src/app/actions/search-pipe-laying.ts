"use server";

import { db } from "@/db/drizzle";
import { pipeLayingType } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getPipeLayingType() {
  return db
    .select({
      id: pipeLayingType.id,
      name: pipeLayingType.name,
    })
    .from(pipeLayingType)
    .orderBy(asc(pipeLayingType.name));
}
