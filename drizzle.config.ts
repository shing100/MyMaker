import { defineConfig } from 'drizzle-kit";

export default defineConfig({
    schema: "./app/features/**/schema.ts",
    out: "./app/migrations",
    dialect: "postgressql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
});