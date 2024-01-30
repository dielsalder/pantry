import { api } from "~/utils/api";
import {
  Accordion,
  ActionIcon,
  Center,
  Group,
  Menu,
  Modal,
  Stack,
} from "@mantine/core";
import { Item } from "../item/Item";
import { Collection } from "../Collection";
import { IconDots, IconSettings, IconTrashX } from "@tabler/icons-react";
import { NewCollection } from "./NewCollection";
import { useDeleteCollection } from "../useDeleteCollection";
import { useOpenDeleteModal } from "./useOpenDeleteModal";
import { useDisclosure } from "@mantine/hooks";
import { CollectionSettings } from "./CollectionSettings";

function ListItem({ id }: { id: number }) {
  return (
    <Item id={id}>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Item.Name />
        <Group align="center" gap="sm" wrap="nowrap">
          <Item.FoodGroups />
          <Item.Quantity />
          <Item.Edit />
          <Item.Delete />
        </Group>
      </Group>
    </Item>
  );
}

function ListCollection({ id }: { id: string }) {
  const openDeleteModal = useOpenDeleteModal(id);
  const { data } = api.collection.read.useQuery(id);
  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure();
  return (
    <>
      <Modal
        opened={settingsOpened}
        onClose={closeSettings}
        title="Edit collection"
      >
        <CollectionSettings
          initialValues={data!}
          onSave={closeSettings}
          onCancel={closeSettings}
        />
      </Modal>
      <Collection id={id} key={id}>
        <Accordion.Item key={id} value={id}>
          <Center>
            <Accordion.Control>
              <Collection.Name />
            </Accordion.Control>
            <Collection.NewItem />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <IconDots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={openSettings}
                  leftSection={<IconSettings size={"1rem"} />}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconTrashX size={"1rem"} />}
                  onClick={openDeleteModal}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Center>
          <Accordion.Panel>
            <Collection.Items Component={ListItem} />
          </Accordion.Panel>
        </Accordion.Item>
      </Collection>
    </>
  );
}
export function List() {
  const { data } = api.user.read.useQuery();
  useDeleteCollection();
  return (
    <Stack gap="lg">
      <Accordion multiple defaultValue={data?.collections.map(({ id }) => id)}>
        {data?.collections.map(({ id }) => <ListCollection id={id} key={id} />)}
      </Accordion>
      <NewCollection />
    </Stack>
  );
}
