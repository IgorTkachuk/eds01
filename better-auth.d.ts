import "better-auth";

declare module "better-auth" {
  interface User {
    username?: string;
  }

  interface Session {
    user: {
      username?: string;
    } & DefaultSession["user"];
  }
}
