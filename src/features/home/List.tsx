import { api } from "~/utils/api";
import {
  Accordion,
  ActionIcon,
  Center,
  Group,
  Menu,
  Modal,
  Pill,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Item } from "../item/Item";
import { Collection } from "../Collection";
import {
  IconBowlSpoon,
  IconClock,
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
import { useAtomValue } from "jotai";
import { notesAtom, viewPrepAtom } from "./viewAtoms";

function ListItem({
  id,
  prep,
  perishable,
  notes,
}: {
  id: number;
  prep?: FoodPrep | null;
  perishable?: boolean;
  notes?: string | null;
}) {
  const { colors } = useMantineTheme();
  const viewNotes = useAtomValue(notesAtom);
  const viewPrep = useAtomValue(viewPrepAtom);
  return (
    <Item id={id}>
      <SimpleGrid cols={2}>
        <Group gap="xs" align="center">
          <Item.Name />
          {prep === "ReadyToEat" && viewPrep && (
            <Tooltip label="This food is ready to eat">
              <Pill bg={colors.green[6]} c="white" visibleFrom="sm">
                <Group wrap="nowrap" align="center" gap="4px">
                  <IconMoodSmile size="0.8rem" />
                  Ready
                </Group>
              </Pill>
            </Tooltip>
          )}
          {prep === "Partial" && viewPrep && (
            <Tooltip label="This food requires minimal prep">
              <Pill c="green" visibleFrom="sm">
                <Group wrap="nowrap" align="center" gap="4px">
                  <IconBowlSpoon size="0.8rem" />
                  Minimal
                </Group>
              </Pill>
            </Tooltip>
          )}
          {perishable && (
            <Tooltip label="Eat this soon!">
              <Pill bg={colors.yellow[3]} visibleFrom="sm" c="dark">
                <Group wrap="nowrap" align="center" gap="4px">
                  <IconClock size="0.8rem" />
                  Perishable
                </Group>
              </Pill>
            </Tooltip>
          )}
          {viewNotes && (
            <Text size="xs" c="dimmed" fw={300} visibleFrom="sm">
              {notes}
            </Text>
          )}
        </Group>
        <Group align="center" gap="sm" wrap="nowrap" justify="end">
          <Item.FoodGroups />
          <Item.Quantity />
          <Item.Edit />
          <Item.Delete />
        </Group>
      </SimpleGrid>
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
    <Stack>
      <Accordion multiple defaultValue={data?.map(({ id }) => id)}>
        {data?.map(({ id }) => <ListCollection id={id} key={id} />)}
      </Accordion>
      <NewCollection />
    </Stack>
  );
}
