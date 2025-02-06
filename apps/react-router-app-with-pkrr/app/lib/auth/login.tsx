import { Form, useNavigation } from "react-router"; // or "react-router-dom" if that's what you use
import type { DisplayProvider } from "@pete_keen/authentication-core";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router";

export default function Login({ providers }: { providers: DisplayProvider[] }) {
	console.log("Login component rendered");
	// const navigation = useNavigation();
	const fetcher = useFetcher();

	useEffect(() => {
		console.log("Login component mounted on the client");
	}, []);
	// const isNavigating = Boolean(navigation.location);

	// Check if any submission is happening (fetcher state or global navigation)
	const isSubmitting = fetcher.state !== "idle";

	// State to track the provider that was clicked
	const [selectedProvider, setSelectedProvider] = useState("");

	// Log state for debugging
	useEffect(() => {
		console.log("fetcher.state:", fetcher.state);
	}, [fetcher.state]);

	// Clear selectedProvider when submission is finished
	useEffect(() => {
		if (fetcher.state === "idle") {
			setSelectedProvider("");
		}
	}, [fetcher.state]);

	const [hover, setHover] = useState(false);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{/* <fetcher.Form method="post" data-turbo="false">
				{isSubmitting ? (
					// Show a loading message once a button is clicked and submission starts
					<div style={{ textAlign: "center" }}>
						<h2>Signing in with {selectedProvider}...</h2>
						<p>Please wait while we redirect you.</p>
					</div>
				) : (
					// Otherwise, show all the login buttons
					<div style={{ display: "inline-block" }}>
						{providers?.map((provider) => (
							<button
								key={provider.key}
								type="submit"
								name="provider"
								value={provider.key}
								onClick={() =>
									setSelectedProvider(provider.name)
								}
								disabled={isSubmitting} // disable the buttons while submitting
								style={{
									width: "100%",
									display: "block",
									color: provider.style.text,
									backgroundColor: provider.style.bg,
									border: "none",
									borderRadius: "4px",
									padding: "12px 20px",
									marginBottom: "10px",
									cursor: isSubmitting
										? "not-allowed"
										: "pointer",
									fontSize: "16px",
									transition: "all 0.2s ease",
								}}
							>
								Login with {provider.name}
							</button>
						))}
					</div>
				)}
			</fetcher.Form> */}
			<form method="post" data-turbo="false">
				{isSubmitting ? (
					// Show a loading message once a button is clicked and submission starts
					<div style={{ textAlign: "center" }}>
						<h2>Signing in with {selectedProvider}...</h2>
						<p>Please wait while we redirect you.</p>
					</div>
				) : (
					// Otherwise, show all the login buttons
					<div style={{ display: "inline-block" }}>
						<h1 style={{ textAlign: "center", fontSize: "22px" }}>
							Continue with
						</h1>
						{providers?.map((provider) => (
							<button
								key={provider.key}
								type="submit"
								name="provider"
								value={provider.key}
								onClick={() =>
									setSelectedProvider(provider.name)
								}
								disabled={isSubmitting} // disable the buttons while submitting
								style={{
									width: "100%",
									display: "block",
									color: provider.style.text,
									backgroundColor: provider.style.bg,
									border: "none",
									borderRadius: "4px",
									padding: "12px 20px",
									marginBottom: "10px",
									cursor: isSubmitting
										? "not-allowed"
										: "pointer",
									fontSize: "16px",
									transition: "all 0.2s ease",
								}}
							>
								{provider.name}
							</button>
						))}
					</div>
				)}
			</form>
		</div>
	);
}
