import { api } from "~/utils/api";
import {
  Accordion,
  ActionIcon,
  Center,
  Group,
  Menu,
  Modal,
  Pill,
  Stack,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Item } from "../item/Item";
import { Collection } from "../Collection";
import {
  IconBowlSpoon,
  IconDots,
  IconMoodSmile,
  IconSettings,
  IconTrashX,
} from "@tabler/icons-react";
import { NewCollection } from "./NewCollection";
import { useDeleteCollection } from "../useDeleteCollection";
import { useOpenDeleteModal } from "./useOpenDeleteModal";
import { useDisclosure } from "@mantine/hooks";
import { CollectionSettings } from "./CollectionSettings";
import { type FoodPrep } from "@prisma/client";

function ListItem({ id, prep }: { id: number; prep?: FoodPrep | null }) {
  const { colors } = useMantineTheme();
  return (
    <Item id={id}>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Group>
          <Item.Name />
          {prep === "ReadyToEat" && (
            <Tooltip label="This food is ready to eat">
              <Pill bg={colors.green[6]} c="white" visibleFrom="sm">
                <Group wrap="nowrap" align="center" gap="4px">
                  <IconMoodSmile size="0.8rem" />
                  Ready
                </Group>
              </Pill>
            </Tooltip>
          )}
          {prep === "Partial" && (
            <Tooltip label="This food requires minimal prep">
              <Pill bg="" c="green" visibleFrom="sm">
                <Group wrap="nowrap" align="center" gap="4px">
                  <IconBowlSpoon size="0.8rem" />
                  Minimal
                </Group>
              </Pill>
            </Tooltip>
          )}
        </Group>
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
  const { data } = api.user.collections.useQuery();
  useDeleteCollection();
  return (
    <Stack gap="lg">
      <Accordion multiple defaultValue={data?.map(({ id }) => id)}>
        {data?.map(({ id }) => <ListCollection id={id} key={id} />)}
      </Accordion>
      <NewCollection />
    </Stack>
  );
}
