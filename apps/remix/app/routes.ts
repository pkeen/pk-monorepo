import {
	type RouteConfig,
	route,
	index,
	layout,
	prefix,
} from "@react-router/dev/routes";

export default [
	index("routes/_index.tsx"),
	// route("about", "./about.tsx"),

	layout("routes/_layout.tsx", [
		route("/auth/login", "routes/auth/login.tsx"),
		route("/auth/logout", "routes/auth/logout.tsx"),
		route("/auth/signup", "routes/auth/signup.tsx"),
		// route("register", "./auth/register.tsx"),
	]),

	...prefix("api", [
		route("hello", "routes/api/hello.tsx"),
		...prefix("auth", [
			route("login", "routes/api/auth/login.tsx"),
			// route("logout", "routes/api/auth/logout.tsx"),
			// route("signup", "routes/api/auth/signup.tsx"),
		]),
	]),

	// route("/api/auth/login", "routes/api/auth/login.tsx"),
	// route("/api/auth/logout", "routes/api/auth/logout.tsx"),

	// ...prefix("concerts", [
	// 	index("./concerts/home.tsx"),
	// 	route(":city", "./concerts/city.tsx"),
	// 	route("trending", "./concerts/trending.tsx"),
	// ]),
] satisfies RouteConfig;
