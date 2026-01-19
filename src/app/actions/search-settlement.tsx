"use server";

import { db } from "@/db/drizzle";
import { settlement } from "@/db/schema";
import { ilike } from "drizzle-orm";

export type SettlementDTO = {
  id: number;
  name: string;
};

export const searchSettlement = async (
  term: string,
): Promise<SettlementDTO[]> => {
  if (term.length < 2) return [];

  const settlements = await db
    .select({
      id: settlement.id,
      name: settlement.name,
    })
    .from(settlement)
    .where(ilike(settlement.name, `%${term}%`))
    .limit(20);

  return settlements;
};
