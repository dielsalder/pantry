import { AppShell, Center, Loader, Table, Title } from "@mantine/core";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";

export default function AllItems() {
  const { data, isLoading } = api.user.items.useQuery();
  const tableData = {
    head: ["Name", "Quantity", "Unit", ""],
    body: data?.map(({ name, quantity, unit }) => [name, quantity, unit]),
  };
  return (
    <>
      <Header>
        <Title order={2} size="h3">
          All Items
        </Title>
      </Header>
      <AppShell.Main>
        {isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Table data={tableData} />
        )}
      </AppShell.Main>
    </>
  );
}
