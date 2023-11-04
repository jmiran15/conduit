import { Group, Text } from "@mantine/core";
import { Tag } from "@prisma/client";

import Tags from "./Tags";

export default function Footer({ tags }: { tags: Tag[] }) {
  return (
    <Group justify="space-between">
      <Text size="sm" color="dimmed">
        Read more...
      </Text>
      <Tags tags={tags} />
    </Group>
  );
}
