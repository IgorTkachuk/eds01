CREATE TABLE "postgres"."performer" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."performer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(60)
);
--> statement-breakpoint
ALTER TABLE "postgres"."request" ADD COLUMN "performer" integer;