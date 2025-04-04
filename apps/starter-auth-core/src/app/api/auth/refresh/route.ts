import { authSystem, sessionStateStorage } from "@/app/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	// 1: Get the refresh token
	const keyCards = await sessionStateStorage.retrieve(request);
	if (!keyCards) {
		return NextResponse.json(
			{ message: "No refresh token found" },
			{ status: 401 }
		);
	}
	// if no refresh token, return 401
	// this should be abstracted into a single authState call

	// 2. Verify the refresh token
	// if expired, return 401
	const newAuthState = await authSystem.refresh(keyCards);
	// this is just the access token currently

	console.log("newAuthState: ", newAuthState);

	if (!newAuthState.isLoggedIn || !newAuthState.keyCards) {
		return NextResponse.json(
			{ message: "Refresh token is invalid" },
			{ status: 401 }
		);
	}

	await sessionStateStorage.store(newAuthState.keyCards, request);

	// 3. Get the new access token
	// const response = new NextResponse();
	// await authSystem.refreshToken(request, response);
	// return response;

	// return a basic response for now
	return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
