import { Form } from "react-router";
// import AuthComponent from "../lib/auth/auth-component";
import { AuthComponent } from "@pete_keen/react-router-auth/client";
import { authLoader, authAction } from "../auth";

// if (!process.env.JWT_ACCESS_SECRET) {
// 	// throw new Error("JWT_ACCESS_SECRET not found in process.env");
// 	console.log(
// 		"process.env.JWT_ACCESS_SECRET:",
// 		process.env.JWT_ACCESS_SECRET
// 	);
// }

// if (!process.env.JWT_REFRESH_SECRET) {
// 	// throw new Error("JWT_REFRESH_SECRET not found in process.env");
// 	console.log(
// 		"process.env.JWT_REFRESH_SECRET:",
// 		process.env.JWT_REFRESH_SECRET
// 	);
// }

// const jwtOptions = {
// 	access: {
// 		name: "access",
// 		secretKey:
// 			process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "",
// 		algorithm: "HS256",
// 		expiresIn: "30 minutes",
// 		fields: ["id", "email"],
// 	},
// 	refresh: {
// 		name: "refresh",
// 		secretKey:
// 			process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "",
// 		algorithm: "HS256",
// 		expiresIn: "7 days",
// 		fields: ["id"],
// 	},
// };

// const databaseAdapter = DrizzleAdapter(db);

// const config: RRAuthConfig = {
// 	strategy: "jwt",
// 	jwtConfig: jwtOptions,
// 	adapter: databaseAdapter,
// 	providers: [
// 		new Google({
// 			clientId: process.env.GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// 			redirectUri: "http://localhost:5173/auth/redirect/google",
// 		}),
// 		new GitHub({
// 			clientId: process.env.GITHUB_CLIENT_ID!,
// 			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
// 			redirectUri: "http://localhost:5173/auth/redirect/github",
// 		}),
// 		new Zoom({
// 			clientId: process.env.ZOOM_CLIENT_ID!,
// 			clientSecret: process.env.ZOOM_CLIENT_SECRET!,
// 			redirectUri: "http://localhost:5173/auth/redirect/zoom",
// 		}),
// 		new Microsoft({
// 			clientId: process.env.MICROSOFT_CLIENT_ID!,
// 			clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
// 			redirectUri: "http://localhost:5173/auth/redirect/microsoft",
// 		}),
// 		new Facebook({
// 			clientId: process.env.FACEBOOK_CLIENT_ID!,
// 			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
// 			redirectUri: "http://localhost:5173/auth/redirect/facebook",
// 		}),
// 		new LinkedIn({
// 			clientId: process.env.LINKEDIN_CLIENT_ID!,
// 			clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
// 			redirectUri: "http://localhost:5173/auth/redirect/linkedin",
// 		}),
// 	],
// 	logger: {
// 		level: "debug",
// 	},
// 	redirectAfterLogin: "/",
// 	redirectAfterLogout: "/",
// 	sessionSecret: "asfjsdkfj",
// };

// const { login, logout, authLoader, authAction, requireAuth, authSystem } =
// 	Auth(config);

// export { login, logout, requireAuth };

export const loader = authLoader;
export const action = authAction;
export default AuthComponent;

// export { loader, action };
