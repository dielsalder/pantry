import { type PropsWithChildren } from "react";
import { AppShell, NavLink } from "@mantine/core";
import { atom, useAtom, useAtomValue } from "jotai";
import { IconFridge, IconHome2, IconSettings } from "@tabler/icons-react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const navbarOpenedAtom = atom<boolean>(false);
export function useToggleNavbar() {
  const [opened, setOpened] = useAtom(navbarOpenedAtom);
  return () => setOpened(!opened);
}
export function Layout(props: PropsWithChildren) {
  const opened = useAtomValue(navbarOpenedAtom);
  const { data: sessionData } = useSession();
  const pathName = usePathname();
  return (
    <AppShell
      header={{ height: "65" }}
      p="md"
      navbar={{
        collapsed: { desktop: !opened, mobile: !opened },
        width: 200,
        breakpoint: "xs",
      }}
    >
      <Head>
        <title>pantry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sessionData ? (
        <AppShell.Navbar>
          <NavLink
            label="Home"
            leftSection={<IconHome2 size="1rem" />}
            active={pathName === "/home"}
            component={Link}
            href="/home"
          />
          <NavLink
            label="All items"
            leftSection={<IconFridge size="1rem" />}
            href="/all-items"
            active={pathName === "/all-items"}
            component={Link}
          />
          <NavLink
            label="Settings"
            leftSection={<IconSettings size="1rem" />}
            href="/settings"
            active={pathName === "/settings"}
            component={Link}
          />
        </AppShell.Navbar>
      ) : (
        <></>
      )}
      {props.children}
    </AppShell>
  );
}
