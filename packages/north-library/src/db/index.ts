import { drizzle } from "drizzle-orm/neon-http";
// import { getAuthConfig } from "../config/store";
import type { AuthConfig } from "../types/config";

// Have option for application to import its own db instance
// const authConfig = getAuthConfig();

// const db = drizzle(authConfig.databaseUrl, {
// 	logger: true,
// 	casing: "snake_case",
// });

// export type db = typeof db;

export default db;
export * as queries from "./queries";
export * as seeds from "./seeds";
