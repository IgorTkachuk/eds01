"use server";

import { db } from "@/db/drizzle";
import { performer } from "@/db/schema";
import { asc } from "drizzle-orm";

export const getPerformer = async () => {
  return db
    .select({
      id: performer.id,
      name: performer.name,
    })
    .from(performer)
    .orderBy(asc(performer.name));
};
