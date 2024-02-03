import { AppShell, Title } from "@mantine/core";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { atom, useAtom } from "jotai";
import { type Prisma } from "@prisma/client";
import { type ItemsTableSort } from "~/server/api/routers/itemsTableSorts";
import { NameField } from "~/features/all-items/NameField";
import { CollectionField } from "~/features/all-items/CollectionField";
import { DateAdded } from "~/features/all-items/DateAdded";
import { Quantity } from "~/features/all-items/Quantity";
import { Unit } from "~/features/all-items/Unit";
import { FoodGroups } from "~/features/all-items/FoodGroups";

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
          // highlightOnHover
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
              width: "14rem",
              sortable: true,
              render: ({ foodGroups, id }) => (
                <FoodGroups itemId={id} foodGroups={foodGroups} />
              ),
            },
            {
              accessor: "collection",
              sortable: true,
              width: "10rem",
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
              width: "6rem",
              render: ({ quantity, id }) => (
                <Quantity quantity={quantity} id={id} />
              ),
              sortable: true,
            },
            {
              accessor: "unit",
              width: "8rem",
              render: ({ unit, id }) => <Unit unit={unit} id={id} />,
              sortable: true,
            },
          ]}
        />
      </AppShell.Main>
    </>
  );
}
