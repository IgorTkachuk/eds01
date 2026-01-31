import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { genericOAuth } from "better-auth/plugins";
import { keycloak } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    // username(), 
    genericOAuth({
      config: [
        // {
        //   providerId: "provider-id",
        //   clientId: "test-client-id",
        //   clientSecret: "test-client-secret",
        //   discoveryUrl: "https://127.0.0.1:8080/.well-known/openid-configuration"
        // },
        keycloak({
          clientId: process.env.KEYCLOAK_CLIENT_ID!,
          clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
					issuer: process.env.KEYCLOAK_ISSUER!,
        })
      ]
    }),
    nextCookies()
  ],
});
