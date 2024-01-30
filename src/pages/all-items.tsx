import { AppShell, Title } from "@mantine/core";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { format } from "date-fns";
import { atom, useAtom } from "jotai";
import { type Prisma } from "@prisma/client";
import { type ItemsTableSort } from "~/server/api/routers/itemsTableSorts";

type ItemPayload = Prisma.ItemGetPayload<{
  include: { name: true; createdAt: true; collection: true; foodGroups: true };
}>;
const sortStatusAtom = atom<DataTableSortStatus<ItemPayload>>({
  columnAccessor: "name",
  direction: "asc",
});
export default function AllItems() {
  const [sortStatus, setSortStatus] = useAtom(sortStatusAtom);
  const { data, isLoading } = api.user.items.useQuery({
    sort: {
      by: sortStatus.columnAccessor as ItemsTableSort,
      direction: sortStatus.direction,
    },
  });
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
          records={data as ItemPayload[]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          columns={[
            { accessor: "name", sortable: true },
            {
              accessor: "foodGroups",
              sortable: true,
              title: "Food groups",
              render: ({ foodGroups }) =>
                foodGroups.map((foodGroup) => foodGroup.name),
            },
            {
              accessor: "collection",
              sortable: true,
              title: "Collection",
              render: ({ collection }) => collection.name,
            },
            {
              accessor: "createdAt",
              sortable: true,
              title: "Date added",
              render: ({ createdAt }) => format(createdAt, "M/dd/yyyy"),
            },
            {
              accessor: "quantity",
              sortable: true,
              title: "Quantity",
            },
            {
              accessor: "unit",
              sortable: true,
              title: "Unit",
            },
          ]}
        />
      </AppShell.Main>
    </>
  );
}
