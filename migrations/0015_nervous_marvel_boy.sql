ALTER TABLE "postgres"."user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "postgres"."user" ADD COLUMN "display_username" text;--> statement-breakpoint
ALTER TABLE "postgres"."user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");