import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { genericOAuth } from "better-auth/plugins";
import { keycloak, admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import {adminRole, userRole } from "./permissions"
import { ac } from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
//  "https://rprq.cv.grmu.com.ua",
    process.env.BETTER_AUTH_URL!
  ],
  plugins: [
    // username(),
    genericOAuth({
      config: [
        {
          ...keycloak({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
          }),
          discoveryUrl:
            process.env.KEYCLOAK_ISSUER! + "/.well-known/openid-configuration",
          userInfoUrl:
            process.env.KEYCLOAK_ISSUER! + "/protocol/openid-connect/userinfo",
          overrideUserInfo: true,
          async getUserInfo(tokens) {
            if (!tokens.accessToken) {
              throw new Error("No access token returned from Keycloak");
            }
            // 👉 Декодуємо access token
            const payload = JSON.parse(
              Buffer.from(
                tokens.accessToken.split(".")[1],
                "base64",
              ).toString(),
            );

            const realmRoles: string[] = payload.realm_access?.roles ?? [];
            const groups: string[] = payload.groups ?? [];

            let appRole: "admin" | "user" = "user";

            if (
              realmRoles.includes("super_admin") ||
              realmRoles.includes("app_admin")
            ) {
              appRole = "admin";
            }

            return {
              id: payload.sub,
              name: payload.name,
              username: payload.preferred_username,
              email: payload.email,
              image: undefined,
              emailVerified: payload.email_verified,

              // 👇 передаємо далі в better-auth
              role: appRole,

              // кастомні поля (можеш зберігати окремо в БД)
              kcRoles: realmRoles,
              kcGroups: groups,
            };
          },
        },
      ],
    }),
    admin({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
      },
    }),
    nextCookies(),
  ],
});
