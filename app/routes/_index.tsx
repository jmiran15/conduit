import {
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import ArticleCard from "~/components/articleCard/ArticleCard";
import { getAllArticles } from "~/models/article.server";

export const meta: MetaFunction = () => [{ title: "Conduit" }];

// let load in all the articles
export const loader = async () => {
  const articles = await getAllArticles();
  return json({ articles });
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
