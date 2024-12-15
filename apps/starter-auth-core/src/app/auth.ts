import {
	JwtStrategy,
	JwtConfig,
	AuthSystem,
} from "@pete_keen/authentication-core";
import {
	TestAdapter,
	DrizzleAdapter,
} from "@pete_keen/authentication-core/adapters";
import { NextSessionStateStorage } from "@pete_keen/nextjs-authentication";
import db from "../lib/db";

const jwtOptions: JwtConfig = {
	access: {
		key: "KeyCard-access",
		secretKey: process.env.JWT_ACCESS_SECRET_KEY || "asfjsdkfj",
		algorithm: "HS256",
		expiresIn: "30 minutes",
		fields: ["id", "email"],
	},
	refresh: {
		key: "KeyCard-refresh",
		secretKey: process.env.JWT_REFRESH_SECRET_KEY || "jldmff",
		algorithm: "HS256",
		expiresIn: "30 days",
		fields: ["id"],
	},
};

const jwtStrategy = new JwtStrategy(jwtOptions);
// const transportAdapter = new NextAppTransportAdapter();
// const databaseAdapter = TestAdapter();
const databaseAdapter = DrizzleAdapter(db);

export const authSystem = new AuthSystem(jwtStrategy, databaseAdapter);

export const sessionStateStorage = new NextSessionStateStorage();
