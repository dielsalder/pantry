import { AppShell, Title } from "@mantine/core";
import { Header } from "~/components/Header";

export default function AllItems() {
  return (
    <>
      <Header>
        <Title order={3}>all items</Title>
      </Header>
      <AppShell.Main>abc</AppShell.Main>
    </>
  );
}
