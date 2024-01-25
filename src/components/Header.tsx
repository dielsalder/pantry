import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Menu,
  Title,
} from "@mantine/core";
import { navbarOpenedAtom, useToggleNavbar } from "~/components/Layout";
import { signOut } from "next-auth/react";
import { useAtomValue } from "jotai";
import { IconLogout, IconUserFilled } from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  const toggleNavbar = useToggleNavbar();
  const navbarOpened = useAtomValue(navbarOpenedAtom);
  return (
    <AppShell.Header p="md">
      <Group justify="space-between">
        <Burger onClick={toggleNavbar} opened={navbarOpened} />
        {children}
        <Menu>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconUserFilled />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconLogout />}
              onClick={() => {
                void signOut({ callbackUrl: "/login" });
              }}
            >
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  );
}
