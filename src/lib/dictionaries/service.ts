"use server";

import { db } from "@/db/drizzle";
import { dictionaries, DictionaryType } from "./config";
import { eq } from "drizzle-orm";
import { success } from "zod";

export async function getDictionary(type: DictionaryType) {
  const config = dictionaries[type];
  return db.select().from(config.table).orderBy(config.table.name);
}

export async function createDictionaryItem(type: DictionaryType, name: string) {
  const config = dictionaries[type];

  return db.insert(config.table).values({ name }).returning();
}

export async function updateDictionaryItem(
  type: DictionaryType,
  id: number,
  name: string,
) {
  const config = dictionaries[type];

  await db
    .update(config.table)
    .set({ name })
    .where(eq(config.table.id, id))
    .returning();

  return { success: true };
}

export async function deleteDictionaryItem(type: DictionaryType, id: number) {
  const config = dictionaries[type];

  try {
    await db.delete(config.table).where(eq(config.table.id, id));
    return { success: true };
  } catch (err: any) {
    const pgError = err.cause ?? err;
    if (pgError.code === "23503") {
      return {
        success: false,
        reason: "Елемент використовується у пов'язанних записах",
      };
    }
    throw err;
  }
}
