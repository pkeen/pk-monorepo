import { AuthState, ImprovedAuthState, AuthTokens } from "./types";

export interface SessionStateStorage {
	storeAuthState(authTokens: AuthTokens, response?: any): Promise<void>;
	retrieveAuthState(request: any): Promise<AuthTokens | null>;
	clearAuthState(response: any): Promise<void>;
	// create(key: string, value: string, response?: any): Promise<void>;
	// delete(key: string, response?: any): Promise<void>;
}

// export abstract class AbstractSessionStateStorage
// 	implements SessionStateStorage
// {
// 	// storing and retrieving auth state
// 	// I want to have a method defined here that will take take an ImprovedAuthState object and store type and store a cookie for each property
// 	// Each AuthToken in ImprovedAuthState.tokens should be stored as a cookie
// 	protected async storeAuthState(
// 		authTokens: AuthTokens,
// 		response?: any
// 	): Promise<void> {
// 		for (const [key, value] of Object.entries(authTokens)) {
// 			await this.create(key, value, response);
// 		}
// 	}

// 	// protected abstract createCookieOrHeader(
// 	// 	key: string,
// 	// 	value: string,
// 	// 	response?: any
// 	// ): Promise<void>;
// }
