import {
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
// import { Link } from "@remix-run/react";
// import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Conduit" }];

export default function Index() {
  // const user = useOptionalUser();
  return (
    <Stack gap="xl">
      <Center bg="green.6">
        <Stack align="center" justify="center" p="xl">
          <Title
            order={1}
            style={{
              color: "white",
            }}
          >
            conduit
          </Title>
          <Text size="xl" color="white">
            A place to share your knowledge.
          </Text>
        </Stack>
      </Center>
      <Grid px="xl" gutter="xl">
        <Grid.Col span={9}>
          <Tabs defaultValue="global" color="green.6">
            <Tabs.List>
              <Tabs.Tab value="global">Global feed</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="global">
              {/* an article  */}

              <Stack py="xl">
                <Group justify="space-between">
                  <UserInfo />
                  <LikeButton />
                </Group>
                <Title order={3}>
                  If we quantify the alarm, we can get to the FTP pixel through
                  the online SSL interface!
                </Title>
                <Text lineClamp={4} size="md" color="dimmed">
                  Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam
                  aut cupiditate est facere omnis possimus. Tenetur similique
                  nemo illo soluta molestias facere quo. Ipsam totam facilis
                  delectus nihil quidem soluta vel est omnis.
                </Text>
                <ArticleCardFooter />
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card bg="gray.2" p="md" withBorder radius="sm">
            <Stack>
              <Text>Popular Tags</Text>
              <Group gap="xs">
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
                <Badge color="gray">Badge</Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

const UserInfo = () => {
  return <div>hello</div>;
};

const LikeButton = () => {
  return (
    <Button color="green.6" variant="outline">
      42
    </Button>
  );
};

const ArticleCardFooter = () => {
  return (
    <Group justify="space-between">
      <Text size="sm" color="dimmed">
        Read more...
      </Text>
      <BadgeGroup />
    </Group>
  );
};

const BadgeGroup = () => {
  return (
    <Group gap="xs">
      <Badge color="gray" variant="outline" size="sm">
        Badge
      </Badge>
      <Badge color="gray" variant="outline" size="sm">
        Badge
      </Badge>
    </Group>
  );
};
