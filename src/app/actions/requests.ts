import { db } from "@/db/drizzle";
import { request } from "@/db/schema";

export async function getRequests() {
  try {
    const allRequests = await db.select().from(request);
    return allRequests;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
