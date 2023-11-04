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
import { User } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { getArticleBySlug } from "~/models/article.server";
import { createComment } from "~/models/comment.server";
import { getUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const article = await getArticleBySlug(params.slug as string);

  console.log({ articleFound: article });

  if (!article) {
    return redirect("/");
  }

  return json({ article });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  console.log("params: ", params);

  const body = await request.formData();

  // get the userId (redirects if not logged in)
  const userId = await getUserId(request);

  const comment = body.get("comment");

  const createdComment = await createComment(
    comment as string,
    params.slug as string,
    userId as string,
  );

  return json({ comment: createdComment });
};

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  const user = useUser();

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
            <Avatar size="lg" src={article?.author.image} />
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
        <CommentEditor user={user} />
        {article?.comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              author={comment.author}
              body={comment.body}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

const CommentEditor = ({ user }: { user: User }) => {
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
      <Form method="post">
        <Textarea
          m="lg"
          p="0"
          autosize
          minRows={3}
          maxRows={5}
          placeholder="Write a comment..."
          variant="unstyled"
          name="comment"
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
          <Avatar size="md" src={user.image} />
          <Button color="green.6" size="xs" type="submit">
            Post Comment
          </Button>
        </Group>
      </Form>
    </Stack>
  );
};

const Comment = ({ author, body }: { author: User; body: string }) => {
  return (
    <Stack
      p={0}
      className="w-3/4"
      gap="0"
      style={{
        borderRadius: "3px",
        border: "1px solid #e0e0e0",
      }}
    >
      <Text m="lg">{body}</Text>
      <Group
        mt="-5"
        py="md"
        px="lg"
        bg="gray.1"
        justify="space-between"
        style={{
          borderBottomLeftRadius: "3px",
          borderBottomRightRadius: "3px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Group gap="xs">
          <Avatar size="sm" src={author.image} />
          <Link
            to="/profile"
            className="text-xs hover:underline text-green-600 hover:text-green-600"
          >
            {author.email}
          </Link>
        </Group>
        <Button variant="transparent" size="xs" color="gray.9">
          X
        </Button>
      </Group>
    </Stack>
  );
};
