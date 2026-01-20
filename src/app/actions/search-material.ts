"use server";

import { db } from "@/db/drizzle";
import { material } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getMaterial() {
  return db
    .select({
      id: material.id,
      name: material.name,
    })
    .from(material)
    .orderBy(asc(material.name));
}
