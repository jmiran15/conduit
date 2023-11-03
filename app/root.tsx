import "@mantine/core/styles.css";
import {
  MantineProvider,
  ColorSchemeScript,
  AppShell,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// import classes from "./MobileNavbar.module.css";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

import Header from "./components/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body className="h-full">
        <MantineProvider>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { desktop: true, mobile: !opened },
            }}
          >
            <AppShell.Header>
              <Header opened={opened} toggle={toggle} />
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
              <UnstyledButton>Home</UnstyledButton>
              <UnstyledButton>Blog</UnstyledButton>
              <UnstyledButton>Contacts</UnstyledButton>
              <UnstyledButton>Support</UnstyledButton>
            </AppShell.Navbar>

            <AppShell.Main>
              <Outlet />
            </AppShell.Main>
          </AppShell>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
