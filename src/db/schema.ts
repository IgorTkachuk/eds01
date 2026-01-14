import { pgTable, integer, varchar, pgSchema } from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('postgres');

export const rqType = mySchema.table("rqtype",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 255}).notNull()
})

export const settlement = mySchema.table("settlement", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 255}).notNull()
})

export const street = mySchema.table("street", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 255}).notNull()
})

export type Street = typeof street.$inferSelect;