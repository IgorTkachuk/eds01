CREATE TABLE "postgres"."request" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."request_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"streetId" integer,
	"settlementId" integer,
	"rqCharacterId" integer,
	"rqFactId" integer
);
