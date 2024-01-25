import { type PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";
import { atom, useAtom, useAtomValue } from "jotai";
export const navbarOpenedAtom = atom<boolean>(false);
export function useToggleNavbar() {
  const [opened, setOpened] = useAtom(navbarOpenedAtom);
  return () => setOpened(!opened);
}
export function Layout(props: PropsWithChildren) {
  const opened = useAtomValue(navbarOpenedAtom);
  return (
    <AppShell
      header={{ height: "60" }}
      p="md"
      navbar={{
        collapsed: { desktop: opened, mobile: opened },
        width: 200,
        breakpoint: "xs",
      }}
    >
      <AppShell.Navbar>abc</AppShell.Navbar>
      {props.children}
    </AppShell>
  );
}
