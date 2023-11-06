import { Button, Group } from "@mantine/core";
import { Form } from "@remix-run/react";
import { AiFillHeart } from "react-icons/ai";

export default function LikeButton({
  slug,
  userId,
  liked,
  likes,
}: {
  slug: string;
  userId: string;
  liked: boolean;
  likes: number;
}) {
  // this should be a form, where the "action posts to the index route? or maybe if we just leave the action thing out, it will put to whatever route it has rendered in, then we can deal with this possible action anywhere in the app"

  return (
    <Form method="PUT">
      <Button
        size="compact-sm"
        color="green.6"
        variant={liked ? "filled" : "outline"}
        type="submit"
        name="_action"
        value="like"
      >
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="liked" value={liked.toString()} />
        <Group gap="0.2rem">
          <AiFillHeart />
          {`${likes}`}
        </Group>
      </Button>
    </Form>
  );
}
