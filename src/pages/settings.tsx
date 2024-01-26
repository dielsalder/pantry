import { AppShell, Title } from "@mantine/core";
import { Header } from "~/components/Header";
import { FoodGroups } from "../features/settings/FoodGroups";

export default function Settings() {
  return (
    <>
      <Header>
        <Title order={2} size="h3">
          Settings
        </Title>
      </Header>
      <AppShell.Main>
        <FoodGroups />
      </AppShell.Main>
    </>
  );
}
