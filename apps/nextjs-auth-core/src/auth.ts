import {
	GitHub,
	Google,
	Zoom,
	Microsoft,
	Facebook,
} from "@pete_keen/authentication-core/providers";
import { createAuthManager } from "@pete_keen/authentication-core";
import { DrizzleAdapter } from "@pete_keen/authentication-core/adapters";
import db from "./db";

export const authManager = createAuthManager({
	strategy: "jwt",
	jwtConfig: {
		access: {
			name: "access", // for now the names NEED to be access and refresh
			secretKey: "asfjsdkfj",
			algorithm: "HS256",
			expiresIn: "30 minutes",
			fields: ["id", "email"], // TODO: this currently does nothing
		},
		refresh: {
			name: "refresh",
			secretKey: "jldmff",
			algorithm: "HS256",
			expiresIn: "30 days",
			fields: ["id"],
		},
	},
	adapter: DrizzleAdapter(db),
	providers: [
		new GitHub({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			redirectUri: "http://localhost:3000/api/auth/redirect/github",
		}),

		new Zoom({
			clientId: process.env.ZOOM_CLIENT_ID!,
			clientSecret: process.env.ZOOM_CLIENT_SECRET!,
			redirectUri: "http://localhost:5173/auth/redirect/zoom",
		}),

		new Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			redirectUri: "http://localhost:5173/auth/redirect/google",
		}),

		new Microsoft({
			clientId: process.env.MICROSOFT_CLIENT_ID!,
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
			redirectUri: "http://localhost:5173/auth/redirect/microsoft",
		}),

		new Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
			redirectUri: "http://localhost:5173/auth/redirect/facebook",
		}),
	],
	loggerOptions: {
		level: "debug",
		prefix: "Auth",
	},
	// callbacks: {
	// 	augmentUserData: authz.getAuthzData,
	// 	onUserCreated: authz.onUserCreated,
	// 	onUserUpdated: authz.onUserDeleted,
	// 	onUserDeleted: authz.onUserDeleted,
	// },
	// enrichUser: enrich,
});
