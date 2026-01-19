"use server";

import { db } from "@/db/drizzle";
import { rqCharacter } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getRqCharacter() {
  return db
    .select({
      id: rqCharacter.id,
      name: rqCharacter.name,
    })
    .from(rqCharacter)
    .orderBy(asc(rqCharacter.name));
}
