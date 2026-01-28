"use server";

import { db } from "@/db/drizzle";
import { settlement } from "@/db/schema";
import { ilike, eq } from "drizzle-orm";

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

export const getSettlemetById = async (
  id: number,
): Promise<SettlementDTO | undefined> => {
  try {
    // const s = await db
    //   .select({
    //     id: settlement.id,
    //     name: settlement.name,
    //   })
    //   .from(settlement)
    //   .limit(1)
    //   .where(eq(settlement.id, id));
    // return s[0];

    const s = await db.query.settlement.findFirst({
      where: eq(settlement.id, id),
    });

    return s;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
