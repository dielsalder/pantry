import { AppShell, Pill, Title, Group } from "@mantine/core";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { format } from "date-fns";
import { atom, useAtom } from "jotai";
import { type Prisma } from "@prisma/client";
import { type ItemsTableSort } from "~/server/api/routers/itemsTableSorts";
import { FoodGroupIcon } from "~/features/settings/FoodGroupIcon";
import { NameField } from "~/features/all-items/NameField";
import { CollectionField } from "~/features/all-items/CollectionField";
import { DateAdded } from "~/features/all-items/DateAdded";

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
          striped
          withRowBorders={false}
          fetching={isLoading}
          fz="sm"
          verticalSpacing="xs"
          records={data as ItemPayload[]}
          highlightOnHover
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          columns={[
            {
              accessor: "name",
              sortable: true,
              width: "13rem",
              render: ({ name, id }) => <NameField name={name} id={id} />,
            },
            {
              accessor: "foodGroups",
              sortable: true,
              render: ({ foodGroups }) =>
                foodGroups.map(({ icon, name, id }) => (
                  <Pill size="sm" key={id}>
                    <Group gap="2px">
                      <FoodGroupIcon type={icon} size="0.8rem" />
                      {name}
                    </Group>
                  </Pill>
                )),
            },
            {
              accessor: "collection",
              sortable: true,
              width: "13rem",
              render: ({ collection, id }) => (
                <CollectionField
                  collectionName={collection.name}
                  collectionId={collection.id}
                  itemId={id}
                />
              ),
            },
            {
              accessor: "createdAt",
              sortable: true,
              title: "Date added",
              width: "8rem",
              render: ({ createdAt, id }) => (
                <DateAdded value={createdAt} itemId={id} />
              ),
            },
            {
              accessor: "quantity",
              sortable: true,
            },
            {
              accessor: "unit",
              sortable: true,
            },
          ]}
        />
      </AppShell.Main>
    </>
  );
}
