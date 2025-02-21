import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	PgColumn,
	PgTableWithColumns,
	uniqueIndex,
	AnyPgColumn,
	pgSchema,
	primaryKey,
	pgEnum,
	uuid,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("authorization");

export const rolesTable = schema.table(
	"roles",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: text("name").notNull().unique(),
		level: integer("level").notNull().unique(),
		description: text("description"),
	},
	(table) => [
		// Ensure name and level combination is unique
		uniqueIndex("name_level_idx").on(table.name, table.level),
		// Ensure level alone is unique to prevent confusion
		uniqueIndex("level_idx").on(table.level),
		// Ensure name alone is unique for easier lookups
		uniqueIndex("name_idx").on(table.name),
	]
);

export const userRolesTable = schema.table(
	"user_roles",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		user_id: uuid("user_id").notNull().unique(), // the unique means only one role per user
		role_id: uuid("role_id").notNull(),
		assigned_at: timestamp("assigned_at").defaultNow(),
	},
	(table) => [
		// Ensure user_id and role_id combination is unique
		uniqueIndex("user_role_idx").on(table.user_id, table.role_id),
	]
);
