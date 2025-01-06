import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL || "";

export default defineConfig({
	dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
	schema: "./app/lib/db/schema.ts", // Path to schema file
	out: "./app/lib/db/migrations", // Directory to store migration files
	dbCredentials: {
		url: databaseUrl,
	},
	verbose: true,
	casing: "snake_case",
});
