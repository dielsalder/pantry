import { AppShell, Title } from "@mantine/core";
import { Header } from "~/components/Header";

export default function Settings() {
  return (
    <>
      <Header>
        <Title order={2} size="h3">
          Settings
        </Title>
      </Header>
      <AppShell.Main>
        <Title order={3}>Food Groups</Title>
      </AppShell.Main>
    </>
  );
}
