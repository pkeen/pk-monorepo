import { User } from "../../../auth-system/index.types";
import { type JWTPayload } from "jose";

export interface JwtOptions {
	key: string;
	secretKey: string;
	algorithm: string;
	expiresIn: string;
	fields?: string[];
}

export interface VerifiedToken {
	user: User;
	expiresAt: number;
}

/*
 * Payload interface
 */
export interface AuthPayload extends JWTPayload {
	id: string; // User ID
	email: string; // User email
}

/*
    Token service interface 
*/
export interface TokenService {
	generate: (user: User, options: JwtOptions) => Promise<string>;
	validate: (token: string, options: JwtOptions) => Promise<VerifiedToken>;
	// verify: (token: string, options: JwtOptions) => Promise<User>; // return user now
	// revoke: (token: string) => Promise<void>;
	// refresh: (refreshToken: string) => Promise<TokenResponse>;
}
