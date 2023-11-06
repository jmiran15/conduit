import {
  Button,
  Center,
  Divider,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { updateUserById } from "~/models/user.server";
import { logout, requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await requireUserId(request); // redirects if no user
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();

  switch (body.get("_action")) {
    case "update": {
      const pfp = body.get("pfp") as string;
      const email = body.get("email") as string;
      const bio = body.get("bio") as string;

      const updatedUser = await updateUserById(await requireUserId(request), {
        image: pfp,
        email,
        bio,
      });

      return json({ result: updatedUser });
    }
    case "logout":
      return await logout(request);
    default:
      return json({ errors: { _action: "Invalid action" } }, { status: 400 });
  }
};

export default function Settings() {
  const user = useUser();
  // const data = useActionData<typeof action>();

  return (
    <Center>
      <Stack
        align="center"
        justify="flex-start"
        className="w-full md:w-1/2 px-8 md:px-0"
        mt="xl"
      >
        <Title order={1}>Your Settings</Title>
        <Form method="post" className="w-full">
          <fieldset>
            <Stack>
              <TextInput
                size="md"
                placeholder="URL of profile picture"
                defaultValue={user.image || undefined}
                name="pfp"
              />
              <TextInput
                size="lg"
                placeholder="Email"
                defaultValue={user.email}
                name="email"
              />
              <Textarea
                size="lg"
                placeholder="Short bio about you"
                autosize
                minRows={7}
                maxRows={10}
                name="bio"
                defaultValue={user.bio || undefined}
              />
              <Button
                type="submit"
                size="lg"
                color="green.6"
                className="self-end"
                name="_action"
                value="update"
              >
                Update Settings
              </Button>
            </Stack>
          </fieldset>
        </Form>

        <Form method="post" className="w-full">
          <Button
            variant="outline"
            color="red.9"
            size="sm"
            className="self-start"
            type="submit"
            name="_action"
            value="logout"
          >
            Or click here to logout.
          </Button>
        </Form>
      </Stack>
    </Center>
  );
}
