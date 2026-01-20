"use server";

import { db } from "@/db/drizzle";
import { diameter } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getDiameter() {
  return db
    .select({
      id: diameter.id,
      name: diameter.name,
    })
    .from(diameter)
    .orderBy(asc(diameter.name));
}
