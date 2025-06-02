import { bigint, check, foreignKey, integer, jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";


export const products = pgTable("products", {
    product_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    name: text().notNull(),
    tagline: text().notNull(),
    description: text().notNull(),
    how_it_works: text().notNull(),
    icon: text().notNull(),
    url: text().notNull(),
    stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0 }),
    profile_id: uuid()
        .notNull()
        .references(() => profiles.profile_id, {
            onDelete: "cascade",
        }),
    category_id: bigint({ mode: "number" })
        .references(() => categories.category_id, { onDelete: "set null" })
        .notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
},
    (table) => [
        foreignKey({
            columns: [table.profile_id],
            foreignColumns: [profiles.profile_id],
            name: "products_to_profiles",
        }).onDelete("cascade"),
    ]
);


export const categories = pgTable("categories", {
    category_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    description: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
})

export const product_upvotes = pgTable("product_upvotes", {
    product_id: bigint({ mode: "number" }).references(() => products.product_id, { onDelete: "cascade" }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
}, (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })])


export const reviews = pgTable("reviews", {
    review_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    product_id: bigint({ mode: "number" }).references(() => products.product_id, { onDelete: "cascade" }).notNull(),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    rating: integer().notNull(),
    review: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
}, (table) => [check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`)])