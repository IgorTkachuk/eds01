"use server";

import { DictionaryType } from "@/lib/dictionaries/config";
import {
  deleteDictionaryItem,
  createDictionaryItem,
} from "@/lib/dictionaries/service";

export async function deleteDictionaryAction(type: DictionaryType, id: number) {
  await deleteDictionaryItem(type, id);
}

export async function createDictionaryAction(
  type: DictionaryType,
  name: string,
) {
  const [created] = await createDictionaryItem(type, name);
  return created;
}
