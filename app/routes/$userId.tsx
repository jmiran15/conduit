// this page loads the profile of a user
import { Avatar, Button, Stack, Tabs, Title } from "@mantine/core";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";

import ArticleCard from "~/components/articleCard/ArticleCard";
import { getArticlesByUser } from "~/models/article.server";
import { getUserById } from "~/models/user.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  //   const userId = await requireUserId(request); // this should redirect if fails
  const user = await getUserById(params.userId as string);

  // if no user found, redirect to home page, otherwise fetch and return their articles and their user info
  if (!user) {
    return redirect("/");
  } else {
    // load articles by them
    const myArticles = await getArticlesByUser(user?.id);

    return json({ myArticles, user });
  }
};

export default function Profile() {
  // in the loader we "requireUserId", which is a function that returns the current user id, if not found redirects the user to the login page

  const { myArticles, user } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const { userId, tabValue } = useParams();
  const tab_ = `/${userId}/${tabValue === undefined ? "" : tabValue}`;

  return (
    <Stack>
      <Stack bg="gray.0" className="lg:px-72 px-4" py="sm">
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
      <Tabs
        className="lg:px-72 px-4"
        color="green.6"
        value={tab_}
        onChange={(value) => navigate(`${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value={`/${user.id}/`}>My Articles</Tabs.Tab>
          <Tabs.Tab value={`/${user.id}/favorites`}>
            Favorited Articles
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={`/${user.id}/`}>
          {myArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Tabs.Panel>
        <Tabs.Panel value={`/${user.id}/favorites`}>
          <Outlet />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
