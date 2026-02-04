"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/drizzle";
import { type DateRange } from "react-day-picker";
import { asc, eq, gte, lte, and } from "drizzle-orm";
import { request } from "@/db/schema";
import { lastDayOfMonth, startOfMonth } from "date-fns";
import { getUserGroups } from "../actions/account";

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
  const groups = await getUserGroups(session.user.id);

  const where = [];

  if(!groups.includes("cAdmins")){
    where.push(eq(request.userId, session.user.id));
  }

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

export type UserRequest =  Awaited<ReturnType<typeof getUserRequests>>[number]
