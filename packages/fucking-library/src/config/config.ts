import { jwt } from "@utils/token";
import { z } from "zod";

enum Roles {
	Admin = "admin",
	User = "user",
	Guest = "guest",
	// Add more roles as needed
}

// add enum for jwt algorithms

export const defaultConfig = {
	jwtOptions: {
		access: {
			algorithm: "HS256",
			expiresIn: "10 seconds",
		},
		refresh: {
			algorithm: "HS256",
			expiresIn: "30 days",
		},
		// maxTokenAge: "1h", // thats on the verifyToken side
	},
	cookies: {
		namePrefix: "pk-auth",
	},
	roles: Roles,
};

const DrizzleDBSchema = z.custom(
	(value) => {
		return typeof value === "object" && value !== null && "query" in value;
	},
	{
		message: "Invalid Drizzle DB instance",
	}
);

export const AuthConfigSchema = z.object({
	db: DrizzleDBSchema,
	databaseUrl: z.string({ required_error: "DATABASE_URL is required" }), // Required
	secretKey: z.string({ required_error: "SECRET_KEY is required" }), // id needed test with hardcoded
	jwtOptions: z.object({
		access: z.object({
			algorithm: z.string().default("HS256"),
			expiresIn: z.string().default("10 seconds"),
		}),
		refresh: z.object({
			algorithm: z.string().default("HS256"),
			expiresIn: z.string().default("30 days"),
		}),
	}),
	cookies: z.object({
		namePrefix: z.string().default("pk-auth"),
	}),
	roles: z.array(z.string()).default(["admin", "user", "guest"]), // Default roles
});

export type AuthConfig = z.infer<typeof AuthConfigSchema>;
