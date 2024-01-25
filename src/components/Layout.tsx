import { type PropsWithChildren } from "react";
import { AppShell, NavLink } from "@mantine/core";
import { atom, useAtom, useAtomValue } from "jotai";
import { IconFridge, IconHome2 } from "@tabler/icons-react";
import Head from "next/head";
import { useSession } from "next-auth/react";
export const navbarOpenedAtom = atom<boolean>(false);
export function useToggleNavbar() {
  const [opened, setOpened] = useAtom(navbarOpenedAtom);
  return () => setOpened(!opened);
}
export function Layout(props: PropsWithChildren) {
  const opened = useAtomValue(navbarOpenedAtom);
  const { data: sessionData } = useSession();
  return (
    <AppShell
      header={{ height: "60" }}
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
            leftSection={<IconHome2 size="1rem" href="/home" />}
          />
          <NavLink
            label="All items"
            leftSection={<IconFridge size="1rem" />}
            href="/all-items"
          />
        </AppShell.Navbar>
      ) : (
        <></>
      )}
      {props.children}
    </AppShell>
  );
}
