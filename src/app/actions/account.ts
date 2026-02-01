import { db } from "@/db/drizzle";
import { account } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserGroups(userId: string): Promise<string[]> {
  const acc = await db.query.account.findFirst({
    where: eq(account.userId, userId),
  });

  if (!acc?.idToken) return [];

  const payload = JSON.parse(
    Buffer.from(acc.idToken.split(".")[1], "base64url").toString()
  );

  return payload.groups || [];
}
