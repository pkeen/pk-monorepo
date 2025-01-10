// export const hello = () => {
// 	return "hello world";
// };

import { AuthConfig, AuthSystem } from "@pete_keen/authentication-core";
import { redirect, type ActionFunctionArgs } from "react-router";
import { commitSession, destroySession, getSession } from "./session.server";

// App-specific config extension
export interface ExtendedAuthConfig {
	redirectAfterLogin?: string;
	redirectAfterLogout?: string;
}

// Combined configuration for dependency injection
export type RemixAuthConfig = AuthConfig & ExtendedAuthConfig;

export interface ActionFormFunctionArgs extends ActionFunctionArgs {
	formData: FormData;
}

export const RemixAuth = (config: RemixAuthConfig) => {
	const authSystem = AuthSystem.create(config);

	const createLoginAction = (authSystem: AuthSystem, redirectTo?: string) => {
		return async function login({
			request,
			formData,
		}: ActionFormFunctionArgs) {
			// const formData = await request.formData();
			// ^ thats covered by formData now

			let session = await getSession(request.headers.get("Cookie"));
			const headers = new Headers();
			// console.log("session data:", session.data);

			const { email, password } = Object.fromEntries(formData);
			// const email = entries.email;
			// const password = entries.password;
			// VALIDATION - could be moved to the auth system
			if (typeof email !== "string" && typeof password !== "string") {
				console.error(
					"Expected email and password to be strings, but received non-string values."
				);
			}

			const authState = await authSystem.authenticate({
				email: email as string,
				password: password as string,
			});

			console.log("authState", authState);

			if (!authState.isLoggedIn) {
				return new Response(JSON.stringify(authState), {
					success: false,
					message: "Sign in failed",
				});
			}

			// Get or create a session
			session = await getSession(request.headers.get("Cookie"));
			// console.log("session", session);

			// Store the keycards array in session
			session.set("keyCards", authState.keyCards); // Can be any JSON array
			session.set("user", authState.user);
			session.set("isLoggedIn", authState.isLoggedIn);

			// Commit session and set cookie header
			const cookie = await commitSession(session);

			// console.log("authState", authState);
			// needs session storage

			// If redirectTo is provided, redirect and set cookie
			if (redirectTo) {
				return redirect(redirectTo, {
					headers: {
						"Set-Cookie": cookie, // Properly set headers
					},
				});
			}

			// Otherwise, return a response and still set the cookie
			return new Response(
				JSON.stringify(authState), // Response body
				{
					headers: {
						"Set-Cookie": cookie, // Properly set headers
					},
				}
			);
		};
	};
	const createLogoutAction = (
		authSystem: AuthSystem,
		redirectTo?: string
	) => {
		return async function logout({ request }: ActionFunctionArgs) {
			// Retrieve the session
			let session = await getSession(request.headers.get("Cookie"));
			const keyCards = await session.get("keyCards");
			console.log("keyCards", keyCards);

			// Destroy the session and get a new cookie
			const cookie = await destroySession(session);
			console.log("Session destroyed!");

			// call the auth system method
			const authState = await authSystem.logout(keyCards);

			// Handle redirect with Set-Cookie header
			if (redirectTo) {
				return redirect(redirectTo, {
					headers: {
						"Set-Cookie": cookie, // <- Send the cookie header
					},
				});
			}

			// Return JSON response with the Set-Cookie header
			return new Response(
				JSON.stringify({
					success: true,
					message: "Session destroyed!",
				}),
				{
					status: 200,
					headers: {
						"Set-Cookie": cookie, // <- Send the cookie header
						"Content-Type": "application/json",
					},
				}
			);
		};
	};
	const createSignupAction = (
		authSystem: AuthSystem,
		redirectTo?: string
	) => {
		return async function signup({ request }: ActionFunctionArgs) {
			// get the form data
			const formData = await request.formData();
			console.log("form data", formData);
			const entries = Object.fromEntries(formData);
			const email = entries.email;
			const password = entries.password;
			if (typeof email !== "string" && typeof password !== "string") {
				console.error(
					"Expected email and password to be strings, but received non-string values."
				);
			}

			// create the user
			const authState = await authSystem.signup({
				email: email as string,
				password: password as string,
			});

			if (!authState.isLoggedIn) {
				return new Response(JSON.stringify(authState), {
					success: false,
					message: "Sign up failed",
				});
			}
			// Get or create a session
			let session = await getSession(request.headers.get("Cookie"));
			console.log("session", session);

			// Store the keycards array in session
			session.set("keyCards", authState.keyCards); // Can be any JSON array

			// Commit session and set cookie header
			const cookie = await destroySession(session);

			console.log("authState", authState);
			// needs session storage

			// If redirectTo is provided, redirect and set cookie
			if (redirectTo) {
				return redirect(redirectTo, {
					headers: {
						"Set-Cookie": cookie, // Properly set headers
					},
				});
			}

			// Otherwise, return a response and still set the cookie
			return new Response(
				JSON.stringify(authState), // Response body
				{
					headers: {
						"Set-Cookie": cookie, // Properly set headers
					},
				}
			);
		};
	};
	return {
		authSystem,
		login: createLoginAction(authSystem, config.redirectAfterLogin),
		logout: createLogoutAction(authSystem, config.redirectAfterLogout),
		signup: createSignupAction(authSystem, config.redirectAfterLogin),
	};
};

export default RemixAuth;
