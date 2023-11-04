import { Avatar, Button, Stack, Tabs, Text, Title } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request); // this should redirect if fails
  return {};
};

export default function Profile() {
  // in the loader we "requireUserId", which is a function that returns the current user id, if not found redirects the user to the login page
  const user = useUser(); // will throw error if no user returned, which shouldnt happen because requireUser redirects if no user, and the loader loads before renderings

  return (
    <Stack>
      <Stack bg="gray.0" px="xl" py="sm">
        <Stack gap="xs" align="center" justify="center" py="xl">
          <Avatar size="xl" src={user.image} alt={user.email} />
          <Title order={3}>{user.email}</Title>
        </Stack>
        <Link to="/settings" className="self-end">
          <Button variant="outline" size="xs" color="gray">
            Edit Profile Settings
          </Button>
        </Link>
      </Stack>
      <Tabs defaultValue="my" color="green.6" px="xl">
        <Tabs.List>
          <Tabs.Tab value="my">My Articles</Tabs.Tab>
          <Tabs.Tab value="fav">Favorited Articles</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="my">
          <Text>No articles are here... yet.</Text>
        </Tabs.Panel>
        <Tabs.Panel value="fav">
          <Text>No articles are here... yet.</Text>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
