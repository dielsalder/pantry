import {
  ActionIcon,
  AppShell,
  Burger,
  Grid,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import { navbarOpenedAtom, useToggleNavbar } from "~/components/Layout";
import { signOut } from "next-auth/react";
import { useAtomValue } from "jotai";
import { IconLogout, IconMoonStars, IconUserFilled } from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  const toggleNavbar = useToggleNavbar();
  const navbarOpened = useAtomValue(navbarOpenedAtom);
  const { toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShell.Header p="sm">
      <Grid align="center">
        <Grid.Col span="content">
          <Burger onClick={toggleNavbar} opened={navbarOpened} />
        </Grid.Col>
        <Grid.Col span="auto">{children}</Grid.Col>
        <Grid.Col span="content">
          <Menu>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconUserFilled size="1.4rem" />
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
              <Menu.Item
                leftSection={<IconMoonStars />}
                onClick={toggleColorScheme}
              >
                Toggle dark mode
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
      </Grid>
    </AppShell.Header>
  );
}
