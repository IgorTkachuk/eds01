--> CREATE SCHEMA "postgres";
--> statement-breakpoint
CREATE TABLE "postgres"."settlement" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."settlement_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
--> ALTER TABLE "public"."rqtype" SET SCHEMA "postgres";
