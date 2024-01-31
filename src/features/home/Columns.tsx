import {
  SimpleGrid,
  Stack,
  Group,
  ActionIcon,
  Menu,
  ActionIconGroup,
} from "@mantine/core";
import { api } from "~/utils/api";
import { Collection } from "../Collection";
import { NewCollection } from "./NewCollection";
import { Item } from "../item/Item";
import { IconDots, IconSettings, IconTrashX } from "@tabler/icons-react";
import { useOpenDeleteModal } from "./useOpenDeleteModal";

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
function ColumnCollection({ id }: { id: string }) {
  const openDeleteModal = useOpenDeleteModal(id);
  return (
    <Collection id={id}>
      <Stack>
        <Group justify="space-between" align="stretch">
          <Collection.Name />
          <ActionIconGroup>
            <Collection.NewItem />
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle" size="md">
                  <IconDots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings size={"1rem"} />}>
                  Settings
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconTrashX size={"1rem"} />}
                  onClick={openDeleteModal}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </ActionIconGroup>
        </Group>
        <Collection.Items Component={ColumnItem} />
      </Stack>
    </Collection>
  );
}
export function Columns() {
  const { data } = api.user.collections.useQuery();
  return (
    <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }}>
      {data?.map(({ id }) => <ColumnCollection id={id} key={id} />)}
      <NewCollection />
    </SimpleGrid>
  );
}
