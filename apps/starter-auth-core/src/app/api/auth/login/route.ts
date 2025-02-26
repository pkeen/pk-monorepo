// import { AuthenticationService } from "@pete_keen/auth-core";
import { NextResponse } from "next/server";

import { authSystem, sessionStateStorage } from "@/app/auth";

export async function POST(request: Request) {
	const credentials = await request.json();

	const authState = await authSystem.authenticate(credentials);

	if (authState.isLoggedIn && authState.keyCards) {
		const res = NextResponse.next();
		await sessionStateStorage.store(authState.keyCards, res);
		return NextResponse.json({
			success: true,
			message: "Sign in successful",
		});
	}

	return new Response(JSON.stringify(authState));
}
