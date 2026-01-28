"use server";

import { db } from "@/db/drizzle";
import { street } from "@/db/schema";
import { ilike, eq } from "drizzle-orm";
import { cache } from "react";

export type StreetDTO = {
  id: number;
  name: string;
};

export const searchStreet = cache(
  async (term: string): Promise<StreetDTO[]> => {
    if (term.length < 2) return [];

    const strs = await db
      .select({
        id: street.id,
        name: street.name,
      })
      .from(street)
      .where(ilike(street.name, `%${term}%`))
      .limit(20);

    return strs;
  },
);

export const getStreetById = cache(
  async (id: number): Promise<StreetDTO | undefined> => {
    try {
      const str = await db.query.street.findFirst({
        where: eq(street.id, id),
      });

      return str;
    } catch (error) {
      console.error(error);
    }
  },
);
