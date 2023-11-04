// page for specific article, same page we go to when we click on an article anywhere else in the website

import {
  Avatar,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getArticleBySlug } from "~/models/article.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const article = await getArticleBySlug(params.slug as string);

  console.log({ articleFound: article });

  if (!article) {
    return redirect("/");
  }

  return json({ article });
};

export default function Article() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <Stack pb="xl">
      <Stack bg="gray.8" className="lg:px-48 px-4" py="xl" gap="xl">
        <Title
          order={1}
          style={{
            color: "white",
          }}
        >
          {article?.title}
        </Title>
        <Group gap="md">
          <Group>
            <Avatar size="lg" />
            <Stack gap="0">
              <Text color="white">{article?.author.email}</Text>
              <Text size="xs" color="white">
                {new Date(article?.createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Stack>
          </Group>
          <Group gap="xs">
            <Button variant="outline" size="xs" color="gray.5">
              Edit Article
            </Button>
            <Button variant="outline" size="xs" color="red.9">
              Delete Article
            </Button>
          </Group>
        </Group>
      </Stack>
      <Stack className="lg:px-48 px-4" py="xl" gap="xl">
        <Text>{article?.body}</Text>
        <Divider />
      </Stack>
      <Stack className="lg:mx-48 mx-4" align="center">
        <CommentEditor />
        <Comment />
        <Comment />
      </Stack>
    </Stack>
  );
}

const CommentEditor = () => {
  return (
    <Stack
      p={0}
      className="w-3/4"
      gap="0"
      style={{
        // add a border radius
        borderRadius: "3px",

        // add a border line
        border: "1px solid #e0e0e0",
      }}
    >
      <Textarea
        m="lg"
        p="0"
        autosize
        minRows={3}
        maxRows={5}
        placeholder="Write a comment..."
        variant="unstyled"
      />
      <Group
        mt="-5"
        py="md"
        px="lg"
        bg="gray.1"
        justify="space-between"
        style={{
          // add a border radius to the group only in bottom
          borderBottomLeftRadius: "3px",
          borderBottomRightRadius: "3px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Avatar size="md" />
        <Button color="green.6" size="xs">
          Post Comment
        </Button>
      </Group>
    </Stack>
  );
};

const Comment = () => {
  return (
    <Stack
      p={0}
      className="w-3/4"
      gap="0"
      style={{
        // add a border radius
        borderRadius: "3px",

        // add a border line
        border: "1px solid #e0e0e0",
      }}
    >
      <Text m="lg">This is a comment</Text>
      <Group
        mt="-5"
        py="md"
        px="lg"
        bg="gray.1"
        justify="space-between"
        style={{
          // add a border radius to the group only in bottom
          borderBottomLeftRadius: "3px",
          borderBottomRightRadius: "3px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Group gap="xs">
          <Avatar size="sm" />
          <Link
            to="/profile"
            className="text-xs hover:underline text-green-600 hover:text-green-600"
          >
            Author Name
          </Link>
          <Text size="xs" color="gray.6">
            Created at
          </Text>
        </Group>
        <Button variant="transparent" size="xs" color="gray.9">
          X
        </Button>
      </Group>
    </Stack>
  );
};
