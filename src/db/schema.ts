import {
  pgTable,
  integer,
  varchar,
  timestamp,
  pgSchema,
} from "drizzle-orm/pg-core";

export const mySchema = pgSchema("postgres");

export const rqType = mySchema.table("rqtype", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const settlement = mySchema.table("settlement", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const street = mySchema.table("street", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const rqFact = mySchema.table("rqfact", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const rqCharacter = mySchema.table("rqcharacter", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const request = mySchema.table("request", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  streetId: integer(),
  settlementId: integer(),
  rqCharacterId: integer(),
  rqFactId: integer(),
  inputdate: timestamp({ withTimezone: true }),
  finishdate: timestamp({ withTimezone: true }),
  diameterId: integer(),
  materialId: integer(),
  pipeLayingTypeId: integer(),
  pressureId: integer(),
  buildingNumber: varchar("building_number", { length: 10 }),
  customerFullName: varchar("customer_full_name", { length: 255 }),
  customerPhoneNumber: varchar("customer_phone_number", { length: 13 }),
  completedWork: varchar("completed_work", { length: 300 }),
  notes: varchar({ length: 300 }),
  performer: integer(),
});

export const pressure = mySchema.table("pressure", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
});

export const material = mySchema.table("material", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
});

export const diameter = mySchema.table("diameter", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
});

export const pipeLayingType = mySchema.table("pipe_laying_type", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
});

export const performer = mySchema.table("performer", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 60 }),
});

export type Street = typeof street.$inferSelect;
export type Character = typeof rqCharacter.$inferSelect;
export type Fact = typeof rqFact.$inferSelect;
