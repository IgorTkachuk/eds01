CREATE TABLE "postgres"."diameter" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."diameter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "postgres"."material" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."material_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "postgres"."pipe_laying_type" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."pipe_laying_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "postgres"."pressure" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."pressure_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255)
);
