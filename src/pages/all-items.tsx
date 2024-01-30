import { AppShell, Center, Loader, Table, Title } from "@mantine/core";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { DataTable } from "mantine-datatable";
import { format } from "date-fns";

export default function AllItems() {
  const { data, isLoading } = api.user.items.useQuery();
  return (
    <>
      <Header>
        <Title order={2} size="h3">
          All Items
        </Title>
      </Header>
      <AppShell.Main>
        <DataTable
          fetching={isLoading}
          records={data}
          columns={[
            { accessor: "name" },
            {
              accessor: "foodGroups",
              title: "Food groups",
              render: ({ foodGroups }) =>
                foodGroups.map((foodGroup) => foodGroup.name),
            },
            {
              accessor: "collections",
              title: "Collection",
              render: ({ collection }) => collection.name,
            },
            {
              accessor: "createdAt",
              title: "Date added",
              render: ({ createdAt }) => format(createdAt, "M/dd/yyyy"),
            },
          ]}
        />
      </AppShell.Main>
    </>
  );
}
