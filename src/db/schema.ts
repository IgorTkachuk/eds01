import { relations } from "drizzle-orm/relations";

import {
  pgTable,
  integer,
  varchar,
  timestamp,
  pgSchema,
  text,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { use } from "react";

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
  streetId: integer().references(() => street.id),
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
  userId: varchar({ length: 255 }),
});

export const streetRelations = relations(street, ({ many }) => ({
  request: many(request),
}));

export const requestRelations = relations(request, ({ one }) => ({
  street: one(street, {
    fields: [request.streetId],
    references: [street.id],
  }),
  settlement: one(settlement, {
    fields: [request.settlementId],
    references: [settlement.id],
  }),
  rqCharacter: one(rqCharacter, {
    fields: [request.rqCharacterId],
    references: [rqCharacter.id],
  }),
  rqFact: one(rqFact, {
    fields: [request.rqFactId],
    references: [rqFact.id],
  }),
  diameter: one(diameter, {
    fields: [request.diameterId],
    references: [diameter.id],
  }),
  material: one(material, {
    fields: [request.materialId],
    references: [material.id],
  }),
  pipeLayingType: one(pipeLayingType, {
    fields: [request.pipeLayingTypeId],
    references: [pipeLayingType.id],
  }),
  pressure: one(pressure, {
    fields: [request.pressureId],
    references: [pressure.id],
  }),
  performer: one(performer, {
    fields: [request.performer],
    references: [performer.id],
  }),
  user: one(user, {
    fields: [request.userId],
    references: [user.id],
  }),
}));

export const pressure = mySchema.table("pressure", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const material = mySchema.table("material", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const diameter = mySchema.table("diameter", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const pipeLayingType = mySchema.table("pipe_laying_type", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const performer = mySchema.table("performer", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 60 }).notNull(),
});

// Best Auth

export const user = mySchema.table("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = mySchema.table(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = mySchema.table(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = mySchema.table(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export type Street = typeof street.$inferSelect;
export type Character = typeof rqCharacter.$inferSelect;
export type Fact = typeof rqFact.$inferSelect;
export type Request = typeof request.$inferSelect;
