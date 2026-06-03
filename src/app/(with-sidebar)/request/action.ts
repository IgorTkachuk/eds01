"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/drizzle";
import { type DateRange } from "react-day-picker";
import { asc, eq, gte, lte, and, sql, or, ilike, inArray } from "drizzle-orm";
import { request, settlement, street, performer } from "@/db/schema";
import { addMonths, lastDayOfMonth, startOfMonth } from "date-fns";

async function getRequestScope(userId: string) {
  const [{ success: all }, { success: own }] = await Promise.all([
    auth.api.userHasPermission({
      body: { userId, permission: { request: ["viewAll"] } },
    }),
    auth.api.userHasPermission({
      body: { userId, permission: { request: ["viewOwn"] } },
    }),
  ]);

  if (all) return "all";
  if (own) return "own";
  return "none";
}

async function getRequestCriteria(
  range: DateRange = {
    from: startOfMonth(new Date()),
    to: lastDayOfMonth(new Date()),
  },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");
  // const groups = await getUserGroups(session.user.id);

  const where = [];

  const scope = await getRequestScope(session.user.id);
  if (scope === "own") {
    where.push(eq(request.userId, session.user.id));
  } else if (scope === "none") {
    throw new Error("Forbidden");
  }

  if (range?.from) {
    where.push(gte(request.inputdate, range.from));
  }

  if (range?.to) {
    where.push(lte(request.inputdate, range.to));
  }

  return where;
}

const ITEMS_PER_PAGE = 10;
export async function getUserRequests(
  range: DateRange = {
    from: startOfMonth(new Date()),
    to: addMonths(startOfMonth(new Date()), 1),
  },
  page?: number,
  query?: string,
) {
  const where = await getRequestCriteria(range);

  const settlements = query
    ? await db
        .select({ id: settlement.id })
        .from(settlement)
        .where(ilike(settlement.name, `%${query}%`))
    : [];

  const streets = query
    ? await db
        .select({ id: street.id })
        .from(street)
        .where(ilike(street.name, `%${query}%`))
    : [];

  const performers = query
    ? await db
        .select({ id: performer.id })
        .from(performer)
        .where(ilike(performer.name, `%${query}%`))
    : [];

  return await db.query.request.findMany({
    with: {
      street: true,
      settlement: true,
      rqCharacter: true,
      rqFact: true,
      diameter: true,
      material: true,
      pipeLayingType: true,
      pressure: true,
      user: true,
      performer: true,
    },
    where: and(
      ...where,
      query
        ? or(
            inArray(
              request.settlementId,
              settlements.map((x) => x.id),
            ),
            inArray(
              request.streetId,
              streets.map((x) => x.id),
            ),
            inArray(
              request.performer,
              performers.map((x) => x.id),
            ),
            ilike(request.customerFullName, `%${query}%`),
            ilike(request.customerPhoneNumber, `%${query}%`),
          )
        : undefined,
    ),
    orderBy: [asc(request.inputdate)],
    ...(page
      ? {
          offset: (page - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
        }
      : {}),
  });

  //   return db
  //     .select()
  //     .from(request)
  //     .where(and(...filters))
  //     .orderBy(request.createdAt);
}

export async function fetchRequestsPages(
  range: DateRange = {
    from: startOfMonth(new Date()),
    to: lastDayOfMonth(new Date()),
  },
) {
  const where = await getRequestCriteria(range);

  const result = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(request)
    .where(and(...where));

  const totalRequests = result[0].count;

  const totalPages = Math.ceil(totalRequests / ITEMS_PER_PAGE);

  return totalPages;
}

export type UserRequest = Awaited<ReturnType<typeof getUserRequests>>[number];
