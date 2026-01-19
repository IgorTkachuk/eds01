"use server";

import { db } from "@/db/drizzle";
import { rqFact } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getRqFact() {
  return db
    .select({
      id: rqFact.id,
      name: rqFact.name,
    })
    .from(rqFact)
    .orderBy(asc(rqFact.name));
}
