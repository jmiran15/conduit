import {
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import ArticleCard from "~/components/articleCard/ArticleCard";
import {
  getAllArticles,
  likeArticle,
  unlikeArticle,
} from "~/models/article.server";

export const meta: MetaFunction = () => [{ title: "Conduit" }];

// let load in all the articles
export const loader = async () => {
  const articles = await getAllArticles();
  return json({ articles });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();

  const action = body.get("_action");

  switch (action) {
    case "like": {
      const articleSlugToLike = body.get("slug");
      const userId = body.get("userId");
      const likedState = body.get("liked");

      // if userId == "", redirect them to the login page?, this would be good place to implement the redirectTo thing in functions, since we would want to redirect the user back to the article after they signin
      if (!userId) {
        return redirect("/login");
      }
      // if likedState == "true", then unlike the article, otherwise like the article
      if (likedState === "true") {
        console.log("unliking article");
        await unlikeArticle(articleSlugToLike as string, userId as string);
        return json({ liked: false });
      } else {
        console.log("liking article");
        await likeArticle(articleSlugToLike as string, userId as string);
        return json({ liked: true });
      }
    }
    default:
      // return error
      return json({ error: "invalid action" }, { status: 400 });
  }
};

export default function Index() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <Stack gap="xl">
      <Center bg="green.6">
        <Stack align="center" justify="center" p="xl">
          <Title
            order={1}
            style={{
              color: "white",
            }}
          >
            conduit
          </Title>
          <Text size="xl" color="white">
            A place to share your knowledge.
          </Text>
        </Stack>
      </Center>
      <Grid gutter="xl" className="lg:px-48 px-4">
        <Grid.Col span={9}>
          <Tabs defaultValue="global" color="green.6">
            <Tabs.List>
              <Tabs.Tab value="global">Global feed</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="global">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card bg="gray.2" p="md" withBorder radius="sm">
            <Stack>
              <Text>Popular Tags</Text>
              <Group gap="xs">
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
