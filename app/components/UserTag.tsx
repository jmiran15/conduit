import { Avatar, Group, Stack, Text } from "@mantine/core";
import { User } from "@prisma/client";
import { Link } from "@remix-run/react";

export default function UserTag({
  user,
  date,
  // emailColor = "green.6",
  avatarSize = "md",
}: {
  user: User;
  date: Date;
  // emailColor?: string;
  avatarSize?: string;
}) {
  console.log("user tag testing: ", { user, date });

  return (
    <Group>
      <Avatar size={avatarSize} src={user.image} />
      <Stack gap="0">
        <Link
          to={`/${user.id}`}
          className="text-xs hover:underline text-green-600 hover:text-green-600"
        >
          {user.email}
        </Link>
        <Text size="xs" color="gray.6">
          {new Date(date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </Stack>
    </Group>
  );
}
