// export interface PublicUser {
// 	id: number;
// 	email: string;
// 	// roles: string[];
// }

import { AuthError } from "../error";

// Basic return type for Authentication functions
export type AuthState =
	| { authenticated: true; user: User; keyCards: KeyCards }
	| { authenticated: false; user: null; keyCards: null; error: AuthError };

// Base token type with common properties
export interface AuthToken {
	value: string;
	expiresAt?: Date;
	name?: string;
	type: "access" | "refresh";
}

export interface CookieOptions {
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: "strict" | "lax" | "none";
	maxAge?: number;
	path?: string;
}

export interface SessionElement {
	name: string;
	value: string;
	expiresAt?: Date;
	type?: "access" | "refresh" | "session";
	sessionStorageOptions: CookieOptions;
}

export type SessionElements = SessionElement[];

export type ImprovedSessionState = {
	sessionElements: SessionElements;
};

export interface KeyCard {
	name: string;
	value: string;
	expiresAt?: Date;
	type?: "access" | "refresh" | "session";
	storageOptions: CookieOptions;
}

export type KeyCards = KeyCard[];

// // All possible token types in the system
export interface AuthTokens {
	accessToken?: AuthToken;
	refreshToken?: AuthToken;
	sessionId?: AuthToken;
	csrfToken?: AuthToken;
}

// // Session Element
// export interface SessionElement {
// 	value: string;
// 	expiresAt?: Date;
// 	name?: string;
// 	type: "access" | "refresh" | "session" | "csrf";
// }
// this would be for sending to the client from the server, it will help with setting

export interface SessionState {
	accessToken?: SessionElement;
	refreshToken?: SessionElement;
	sessionId?: SessionElement;
	csrfToken?: SessionElement;
}

// export interface ImprovedSessionState {
//     tokens:
// }

export interface User {
	id: string;
	name?: string | null;
	email: string;
	image?: string | null;
}

export interface DatabaseUser {
	id: string;
	name?: string | null;
	email: string;
	emailVerified?: Date | null;
	image?: string | null;
	password?: string;
}

export interface Resource {
	ownerId: string;
	status: string;
}

export interface Credentials {
	email: string;
	password: string;
}

export interface SignupCredentials extends Credentials {
	email: string;
	password: string;
	name?: string;
}

// export type AuthResult = {
// 	success: boolean;
// 	authState?: AuthState;
// };

// export interface AuthStatus {
// 	isLoggedIn: boolean;
// 	user: User | null;
// 	keyCards: KeyCards | null;
// }

export interface AuthManager {
	// authenticate: (credentials: Credentials) => Promise<ImprovedAuthState>;
	authenticate: (credentials: Credentials) => Promise<AuthState>;
	// can: (user: User, action: string, resource: Resource) => boolean;
	// storageAdapter: WebStorageAdapter;
	signup: (credentials: SignupCredentials) => Promise<AuthState>;
	validate: (keyCards: KeyCards) => Promise<AuthState>;
	// refreshToken: (refreshToken: string) => Promise<AuthResult>;
	logout: (keyCards: KeyCards) => Promise<void>;
	// refresh: (keyCards: KeyCards) => Promise<ImprovedAuthState>;
}

// Core interfaces that other components must implement

// Core token service interface
export interface TokenService {
	generate: (user: User, options: JwtOptions) => Promise<string>;
	// verify: (token: string, options: JwtOptions) => Promise<User>; // return user now
	// revoke: (token: string) => Promise<void>;
	// refresh: (refreshToken: string) => Promise<TokenResponse>;
	validate: (token: string, options: JwtOptions) => Promise<VerifiedToken>;
}

// This adapter handles the specifics of how tokens are stored in a web browser
export interface WebStorageAdapter {
	storeTokens: (tokens: AuthTokens) => Promise<void>;
	getStoredTokens: () => Promise<AuthTokens | null>;
	clearTokens: () => Promise<void>;
	getCookieHeaders: (tokens: AuthTokens) => Record<string, string[]>;
	getRemovalHeaders: () => Record<string, string[]>;
}

export interface CsrfOptions {
	cookieName?: string;
	headerName?: string;
	tokenLength?: number;
}

export interface JwtOptions {
	key: string;
	secretKey: string;
	algorithm: string;
	expiresIn: string;
	fields?: string[];
}

export interface JwtConfig {
	access: JwtOptions;
	refresh: JwtOptions;
}

export interface SessionConfig {
	key: string;
	secretKey: string;
	algorithm: string;
	expiresIn: string;
	fields?: string[];
}

// export interface AuthValidationResult {
// 	// valid: boolean;
// 	isAuthenticated: boolean;
// 	user?: User; // Populated if validation succeeded and we could derive a user
// 	reason?: string; // Human-readable explanation of why validation failed
// 	code?: string; // Machine-readable error code (e.g., "expired", "invalid_signature", "session_not_found")
// 	expiresAt?: number; // Optional, e.g., for JWT to indicate expiration time
// }

// export type AuthResult =
// 	| { success: true; status: AuthStatus }
// 	| { success: false; status: AuthStatus };

// export type AuthResult =
// 	| { success: true; user: User; keyCards: KeyCards }
// 	| { success: false; error: AuthError };

export interface VerifyResult {
	valid: boolean;
	user?: User; // Populated on success
	reason?: string; // Human-readable reason for failure
	code?: string; // Machine-readable error code (e.g., "expired_token", "invalid_signature")
}

export interface AuthStrategy {
	createKeyCards(user: User): Promise<KeyCards>;
	logout(keyCards: KeyCards): Promise<void>;
	validate(keyCards: KeyCards): Promise<AuthState>;
	// validateCard(keyCards: KeyCards, name: string): Promise<AuthResult>;
	// validateAll(keyCards: KeyCards): Promise<AuthValidationResult>;
	// validateRefresh?(keyCards: KeyCards): Promise<AuthValidationResult>;
	supportsRefresh(): boolean;
	// signup(credentials: Credentials): Promise<KeyCards>;
	// revoke(token: string): Promise<void>; could support revoking
}

export interface VerifiedToken {
	user: User;
	expiresAt: number;
}

export * from "./UserRegistry";
