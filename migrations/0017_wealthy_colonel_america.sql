ALTER TABLE "postgres"."session" ADD COLUMN "impersonated_by" text;--> statement-breakpoint
ALTER TABLE "postgres"."user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "postgres"."user" ADD COLUMN "banned" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "postgres"."user" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "postgres"."user" ADD COLUMN "ban_expires" timestamp;