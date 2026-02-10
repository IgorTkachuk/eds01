import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { genericOAuthClient, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: "http://localhost:3000"
  // plugins: [usernameClient(), genericOAuthClient()],
  plugins: [genericOAuthClient(), adminClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
