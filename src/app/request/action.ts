"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/drizzle";
import { type DateRange } from "react-day-picker";
import { asc, eq, gte, lte, and } from "drizzle-orm";
import { request } from "@/db/schema";
import { lastDayOfMonth, startOfMonth } from "date-fns";

export async function getUserRequests(
  range: DateRange = {
    from: startOfMonth(new Date()),
    to: lastDayOfMonth(new Date()),
  },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const where = [eq(request.userId, session.user.id)];

  if (range?.from) {
    where.push(gte(request.inputdate, range.from));
  }

  if (range?.to) {
    where.push(lte(request.inputdate, range.to));
  }

  return await db.query.request.findMany({
    with: {
      street: true,
      performer: true,
      settlement: true,
    },
    where: and(...where),
    orderBy: [asc(request.inputdate)],
  });

  //   return db
  //     .select()
  //     .from(request)
  //     .where(and(...filters))
  //     .orderBy(request.createdAt);
}
