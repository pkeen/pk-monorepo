import { AppShell, Burger, Container, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { loader as layoutLoader } from "./layout.loader.server";
export { layoutLoader as loader };
// import type { WithAuthHandlerArgs } from "@pete_keen/react-router-auth";
import Header from "~/lib/components/header";

// export const loader = withAuth(async ({ user }) => {
// 	return { user };
// });

export default function Layout({ loaderData }: Route.ComponentProps) {
	const { user } = loaderData;
	console.log(user);
	const [opened, { toggle }] = useDisclosure();

	return (
		<Paper>
			<AppShell
				header={{ height: 60, offset: true }}
				footer={{ height: 60, offset: true }}
				// navbar={{
				// 	width: 250,
				// 	breakpoint: "sm",
				// 	collapsed: { mobile: !opened },
				// }}
				padding="md"
			>
				<AppShell.Header>
					{/* <Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="sm"
					size="sm"
				/>
				<div>Logo</div> */}
					<Container
						size="md"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-around",
							height: "100%",
							width: "100%",

							flex: 1,
						}}
					>
						<Header user={user} />
					</Container>
				</AppShell.Header>

				{/* <AppShell.Navbar p="md">Navbar</AppShell.Navbar> */}

				<AppShell.Main
					// style={{ display: "flex", flexDirection: "column" }}
					style={{ display: "flex" }}
				>
					<Outlet />
				</AppShell.Main>
				<AppShell.Footer>
					<Container size="md">Footer Content</Container>
				</AppShell.Footer>
			</AppShell>
		</Paper>
	);
}
