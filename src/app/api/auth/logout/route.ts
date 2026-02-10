import { auth } from "@/lib/auth"; // твій better-auth server instance
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const idToken = session?.session.token; // залежить від провайдера

  // 1️⃣ Локальний logout BetterAuth
  await auth.api.signOut({
    headers: await headers(),
  });

  // 2️⃣ Формуємо logout URL Keycloak
  const keycloakLogout = new URL(
    `${process.env.KEYCLOAK_ISSUER!}/protocol/openid-connect/logout`
  );

  keycloakLogout.searchParams.set(
    "post_logout_redirect_uri",
    `${process.env.BETTER_AUTH_URL}/login`
  );

  keycloakLogout.searchParams.set("client_id", process.env.KEYCLOAK_CLIENT_ID!);

  if (idToken) {
    keycloakLogout.searchParams.set("id_token_hint", idToken);
  }

  return Response.redirect(keycloakLogout.toString(), 302);
}
