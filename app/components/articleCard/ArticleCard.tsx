// gets article from prop, posts action to like from form, post to what url?
import { Group, Stack, Text, Title } from "@mantine/core";

import { Article_Tags_Author } from "~/models/article.server";

import LikeButton from "../LikeButton";
import UserTag from "../UserTag";

import Footer from "./Footer";
import { Link } from "@remix-run/react";

export default function ArticleCard({
  article,
}: {
  article: Article_Tags_Author;
}) {
  return (
    <Stack py="xl">
      <Group justify="space-between">
        <UserTag user={article.author} date={article.createdAt} />
        <LikeButton likes={10} />
      </Group>
      <Stack gap="0">
        <Link to={`/article/${article.slug}`}>
          <Title order={3}>{article.title}</Title>
          <Text lineClamp={4} size="md" color="gray.6">
            {article.body}
          </Text>
        </Link>
      </Stack>
      <Footer tags={article.tags} />
    </Stack>
  );
}
