import { ActionIcon, AppShell, Burger, Grid, Menu } from "@mantine/core";
import { navbarOpenedAtom, useToggleNavbar } from "~/components/Layout";
import { signOut } from "next-auth/react";
import { useAtomValue } from "jotai";
import { IconLogout, IconUserFilled } from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  const toggleNavbar = useToggleNavbar();
  const navbarOpened = useAtomValue(navbarOpenedAtom);
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
        </Grid.Col>
      </Grid>
    </AppShell.Header>
  );
}
