import { authSystem, sessionStateStorage } from "@/app/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const credentials = await request.json();
		const authState = await authSystem.signup(credentials);
		// store the auth state in the response
		const response = new NextResponse();
		await sessionStateStorage.store(authState.keyCards, response);
		return response;
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
