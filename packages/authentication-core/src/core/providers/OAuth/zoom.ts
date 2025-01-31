import {
	AbstractOAuthProvider,
	OAuthProviderResponse,
	OAuthProviderConfig,
} from "./oauth-provider";
import { UserProfile } from "../../types";
import { AdapterAccount } from "core/adapter";

// TODO: redefine scopes
type ScopeType = "repo" | "repo_status" | "public_repo" | "repo_deployment";

export class Zoom extends AbstractOAuthProvider<ScopeType> {
	public readonly name = "Zoom";
	public readonly type = "oauth";
	public readonly key = "zoom";

	private apiBaseUrl = "https://api.zoom.us";

	protected authorizeEndpoint = "https://zoom.us/oauth/authorize";
	protected tokenEndpoint = "https://zoom.us/oauth/token";

	// TODO: define scopes properly
	protected scopeMap = {
		repo: "repo",
		repo_status: "repo:status",
		repo_deployment: "repo_deployment",
		public_repo: "public_repo",
	};

	protected defaultScopes = [];

	constructor(config: OAuthProviderConfig<ScopeType>) {
		super(config);
	}

	async exchangeCodeForTokens(
		authorizationCode: string
	): Promise<Record<string, any>> {
		// TODO: improve return type definition
		const headers = new Headers();
		headers.append(
			"Authorization",
			`Basic ${Buffer.from(
				`${this.clientId}:${this.clientSecret}`
			).toString("base64")}`
		);
		headers.append("Content-Type", "application/x-www-form-urlencoded");

		const tokenUrl = new URL(this.tokenEndpoint);
		tokenUrl.searchParams.append("code", authorizationCode);
		tokenUrl.searchParams.append("grant_type", "authorization_code");
		tokenUrl.searchParams.set("redirect_uri", this.redirectUri);

		const response = await fetch(tokenUrl.toString(), {
			method: "POST",
			headers,
		});

		return response.json();
	}

	async handleRedirect(code: string): Promise<OAuthProviderResponse> {
		const tokens = await this.exchangeCodeForTokens(code);
		console.log("TOKENS:", tokens);
		const userProfile = this.convertToUserProfile(
			await this.getUserProfile(tokens.access_token)
		);
		const adapterAccount = this.convertToAdapterAccount(
			userProfile.id,
			tokens
		);
		console.log(
			"HANDLE REDIRECT USER PROFILE:",
			userProfile,
			"ADAPTER ACCOUNT:",
			adapterAccount
		);
		return { userProfile, adapterAccount };
	}

	public async getUserProfile(accessToken: string): Promise<ZoomUserProfile> {
		console.log("ZOOM GET USER PROFILE FUNCTION");
		//  THIS IS WHERE THE PROBLEM IS
		const url = new URL(`${this.apiBaseUrl}/v2/users/me`);
		const headers = new Headers();
		headers.append("Authorization", `Bearer ${accessToken}`);
		const response = await fetch(url.toString(), {
			headers,
		});
		console.log("GET PROFILE RESPONSE", response);
		return await response.json();
	}

	private convertToUserProfile(profile: ZoomUserProfile): UserProfile {
		return {
			id: profile.id.toString(),
			name: `${profile.first_name} ${profile.last_name}`,
			email: profile.email,
			image: profile.pic_url,
		};
	}

	private convertToAdapterAccount(
		providerAccountId: string,
		tokens: Record<string, any>
	): AdapterAccount {
		// const expiresAt = Date.now() + tokens.expires_in * 1000;
		// TODO: maybe this should be a generalized function
		const expiresAt = tokens.expires_at
			? tokens.expires_at // If given as UNIX timestamp
			: Math.floor(Date.now() / 1000) + tokens.expires_in; // If given as seconds remaining - I also want to store as seconds not miliseconds
		const adapterAccount: AdapterAccount = {
			// userId: userProfile.id.toString(),
			providerAccountId,
			provider: this.key,
			type: this.type,
			refresh_token: tokens.refresh_token,
			access_token: tokens.access_token,
			expires_at: expiresAt,
			token_type: tokens.token_type,
			scope: tokens.scope,
			// id_token: tokens.id_token,
			// session_state: tokens.session_state,
		};
		return adapterAccount;
	}

	// TODO: implement refreshing tokens
    
}

export interface ZoomTokens {
	access_token: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	api_url: string;
}

export interface ZoomUserProfile {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	type: number;
	role_name: string;
	pmi: number;
	use_pmi: boolean;
	vanity_url: string;
	personal_meeting_url: string;
	timezone: string;
	verified: number;
	created_at: string;
	last_login_time: string;
	last_client_version: string;
	pic_url: string;
	host_key: string;
	jid: string;
	group_ids: string[];
	im_group_ids: string[];
	account_id: string;
	language: string;
	phone_country: string;
	phone_number: string;
	status: string;
}
