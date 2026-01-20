"use server";

import { db } from "@/db/drizzle";
import { pressure } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getPressure() {
  return db
    .select({
      id: pressure.id,
      name: pressure.name,
    })
    .from(pressure)
    .orderBy(asc(pressure.name));
}
