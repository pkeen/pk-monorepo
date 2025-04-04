import { authSystem, sessionStateStorage } from "@/app/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const response = new NextResponse();
	// await authSystem.logout({
	// 	isLoggedIn: true,
	// 	tokens,
	// });

	const keyCards = await sessionStateStorage.clear(request);
	// await sessionStateStorage.clearAuthState(response);

	return response;
}
