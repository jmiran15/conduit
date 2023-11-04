import { Button, Center, Stack, TextInput, Textarea } from "@mantine/core";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { createArticle } from "~/models/article.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await requireUserId(request); // redirects if no user
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const userId = await requireUserId(request);

  const title = body.get("title") as string;
  const about = body.get("about") as string;
  const article = body.get("article") as string;
  const tags = (body.get("tags") as string).split(",");

  const [a, t] = await createArticle(title, about, article, userId, tags);

  console.log({
    a,
    t,
  });

  return json({ result: { article: a, tags: t } });
};

export default function Settings() {
  const data = useActionData<typeof action>();

  console.log("form data: ", data);

  return (
    <Center>
      <Stack
        align="center"
        justify="flex-start"
        className="w-full md:w-1/2 px-8 md:px-0"
        mt="xl"
      >
        <Form method="post" className="w-full">
          <fieldset>
            <Stack>
              <TextInput size="lg" placeholder="Article Title" name="title" />
              <TextInput
                size="md"
                placeholder="What's this article about?"
                name="about"
              />
              <Textarea
                size="md"
                placeholder="Write your article"
                autosize
                minRows={5}
                maxRows={7}
                name="article"
              />
              <TextInput
                size="md"
                placeholder="Enter tags seperated by ,"
                name="tags"
              />
              <Button
                type="submit"
                size="lg"
                color="green.6"
                className="self-end"
                name="_action"
                value="article"
              >
                Publish Article
              </Button>
            </Stack>
          </fieldset>
        </Form>
      </Stack>
    </Center>
  );
}
