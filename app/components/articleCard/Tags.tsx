import { Badge, Group } from "@mantine/core";
import { Tag } from "@prisma/client";

export default function Tags({ tags }: { tags: Tag[] }) {
  return (
    <Group gap="xs">
      {tags.map((tag) => (
        <Badge key={tag.id} color="gray" variant="outline" size="sm">
          {tag.name}
        </Badge>
      ))}
    </Group>
  );
}
