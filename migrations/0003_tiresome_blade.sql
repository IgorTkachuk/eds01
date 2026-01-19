CREATE TABLE "postgres"."rqcharacter" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."rqcharacter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postgres"."rqfact" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."rqfact_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
