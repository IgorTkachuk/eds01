ALTER TABLE "postgres"."request" ADD COLUMN "buildingNumber" varchar(10);--> statement-breakpoint
ALTER TABLE "postgres"."request" ADD COLUMN "customer_full_name" varchar(255);--> statement-breakpoint
ALTER TABLE "postgres"."request" ADD COLUMN "customer_phone_number" varchar(13);--> statement-breakpoint
ALTER TABLE "postgres"."request" ADD COLUMN "completedWork" varchar(300);--> statement-breakpoint
ALTER TABLE "postgres"."request" ADD COLUMN "notes" varchar(300);