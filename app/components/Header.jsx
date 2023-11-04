import { Avatar, Burger, Group, Text, useMantineTheme } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Header({ opened, toggle }) {
  const theme = useMantineTheme();
  const user = useOptionalUser();

  return (
    <Group h="100%" className="lg:px-48 px-4">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Group justify="space-between" style={{ flex: 1 }}>
        <Text size="lg">conduit</Text>
        <Group ml="xl" gap="md" visibleFrom="sm">
          <NavButton to="/" theme={theme}>
            Home
          </NavButton>
          {user ? (
            <AuthenticatedLinks user={user} theme={theme} />
          ) : (
            <UnauthenticatedLinks theme={theme} />
          )}
        </Group>
      </Group>
    </Group>
  );
}

function NavButton({ to, children, theme }) {
  return (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive ? theme.colors.gray[9] : theme.colors.gray[5],
        };
      }}
      to={to}
    >
      {children}
    </NavLink>
  );
}

function UnauthenticatedLinks({ theme }) {
  return (
    <>
      <NavButton to="/register" theme={theme}>
        Sign up
      </NavButton>
      <NavButton to="/login" theme={theme}>
        Sign in
      </NavButton>
    </>
  );
}

function AuthenticatedLinks({ user, theme }) {
  console.log(user);
  return (
    <>
      <NavButton to="/editor" theme={theme}>
        New Article
      </NavButton>
      <NavButton to="/settings" theme={theme}>
        Settings
      </NavButton>
      <Group gap="xs">
        <Avatar src={user.image} size="sm" radius="xl" />
        <NavButton to="/profile" theme={theme}>
          {user.email}
        </NavButton>
      </Group>
    </>
  );
}
