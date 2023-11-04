import { Button } from "@mantine/core";

export default function LikeButton({ likes }: { likes: number }) {
  return (
    <Button color="green.6" variant="outline">
      {likes}
    </Button>
  );
}
