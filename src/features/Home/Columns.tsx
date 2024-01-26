import { SimpleGrid, Stack, Group } from "@mantine/core";
import { api } from "~/utils/api";
import { Collection } from "../Collection";
import { NewCollection } from "./NewCollection";
import { Item } from "../Item";

function ColumnItem({ id }: { id: number }) {
  return (
    <Item id={id}>
      <Group justify="space-between" align="center">
        <Item.Name />
        <Group align="center" gap="sm">
          <Item.Quantity />
          <Item.Edit />
        </Group>
      </Group>
    </Item>
  );
}
export function Columns() {
  const { data } = api.user.read.useQuery();
  return (
    <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }}>
      {data?.collections.map(({ id }) => (
        <Collection id={id} key={id}>
          <Stack>
            <Group justify="space-between" align="stretch">
              <Collection.Name />
              <Collection.NewItem />
            </Group>
            <Collection.Items Component={ColumnItem} />
          </Stack>
        </Collection>
      ))}
      <NewCollection />
    </SimpleGrid>
  );
}
