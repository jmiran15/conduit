// gets article from prop, posts action to like from form, post to what url?
import { Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "@remix-run/react";

import { Article_Tags_Author_Favs } from "~/models/article.server";
import { useOptionalUser } from "~/utils";

import LikeButton from "../LikeButton";
import UserTag from "../UserTag";

import Footer from "./Footer";

export default function ArticleCard({
  article,
}: {
  article: Article_Tags_Author_Favs;
}) {
  const user = useOptionalUser(); // memoize/callback this?

  return (
    <Stack py="xl">
      <Group justify="space-between">
        <UserTag user={article.author} date={article.createdAt} />
        <LikeButton
          slug={article.slug}
          userId={user ? user.id : undefined}
          liked={
            user ? article.favorites.map((f) => f.id).includes(user!.id) : false
          }
          likes={article.favoritesCount}
        />
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
