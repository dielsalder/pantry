import {
  AppShell,
  Button,
  Chip,
  ChipGroup,
  Flex,
  Group,
  Loader,
  Menu,
  Title,
  Stack,
  MenuDivider,
  Text,
  useMantineTheme,
  Indicator,
  Anchor,
  Box,
} from "@mantine/core";
import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import {
  IconBowlSpoon,
  IconCheck,
  IconClock,
  IconEye,
  IconMoodSmile,
  IconNotes,
  IconNotesOff,
  IconTags,
  IconTagsOff,
  IconToolsKitchen,
  IconToolsKitchenOff,
  IconX,
} from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import { List } from "./List";
import { SortIcon, SortName, sortAtom } from "./sortAtom";
import { sorts } from "~/server/api/routers/sort";
import {
  perishableAtom,
  prepAtom,
  selectedFoodGroupsAtom,
} from "./filterAtoms";
import { FoodGroupIcon } from "../settings/FoodGroupIcon";
import { notesAtom, viewFoodGroupsAtom, viewPrepAtom } from "./viewAtoms";
import { navbarOpenedAtom } from "~/components/Layout";
import { useRouter } from "next/navigation";
import { compactAtom } from "./layoutAtoms";

function Filter() {
  const [selectedFoodGroups, setSelectedFoodGroups] = useAtom(
    selectedFoodGroupsAtom,
  );
  const [prep, setPrep] = useAtom(prepAtom);
  const [perishable, setPerishable] = useAtom(perishableAtom);
  const numFilters = selectedFoodGroups.length + prep.length + +perishable;
  const { data, isLoading } = api.user.foodGroups.useQuery();
  const { colors } = useMantineTheme();
  const handleClear = () => {
    setPrep([]);
    setPerishable(false);
    setSelectedFoodGroups([]);
  };
  const router = useRouter();
  const setNavbarOpened = useSetAtom(navbarOpenedAtom);
  const handleClickSettings = () => {
    router.push("/settings");
    setNavbarOpened(true);
  };
  return (
    <Menu width={280} closeOnItemClick={false}>
      <Group gap={2} w="90" wrap="nowrap">
        <Menu.Target>
          <Indicator
            label={numFilters}
            size={16}
            disabled={!numFilters}
            offset={4}
            radius="sm"
            position="middle-start"
          >
            <Button variant="subtle" pr="xs">
              Filter
            </Button>
          </Indicator>
        </Menu.Target>
        {numFilters > 0 && (
          <Button
            variant="subtle"
            radius="xl"
            size="xs"
            px={2}
            onClick={handleClear}
          >
            <IconX size="1.4rem" />
          </Button>
        )}
      </Group>
      <Menu.Dropdown>
        <Menu.Label>Food group</Menu.Label>
        <ChipGroup
          multiple
          value={selectedFoodGroups}
          onChange={setSelectedFoodGroups}
        >
          <Flex direction="row" wrap="wrap" gap="xs" p="xs">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {data?.length === 0 && (
                  <Text c="dark" size="xs" ml="2px">
                    No food groups yet. Visit{" "}
                    <Anchor onClick={handleClickSettings}>Settings</Anchor> to
                    create some.
                  </Text>
                )}
                {data?.map(({ id, name, color, icon }) => (
                  <Chip key={id} value={id} color={color} size="sm">
                    <Group justify="center" gap="4px">
                      {name}
                      <FoodGroupIcon type={icon} size="1rem" />
                    </Group>
                  </Chip>
                ))}
              </>
            )}
          </Flex>
        </ChipGroup>
        <MenuDivider />
        <Menu.Label>Prep</Menu.Label>
        <ChipGroup value={prep} multiple onChange={setPrep}>
          <Stack p="xs" gap="xs">
            <Chip value="Partial" color="green">
              <Group justify="center" gap="4px">
                Minimal
                <IconBowlSpoon size="0.8rem" />
              </Group>
            </Chip>
            <Chip value="ReadyToEat" color="green">
              <Group justify="center" gap="4px">
                Ready to eat
                <IconMoodSmile size="0.8rem" />
              </Group>
            </Chip>
          </Stack>
        </ChipGroup>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconClock size="1rem" />}
          rightSection={
            perishable && <IconCheck size="1.4rem" color={colors.blue[5]} />
          }
          onClick={() => setPerishable(!perishable)}
        >
          Perishable
          <Text size="xs" c="dimmed">
            Goes bad soon
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
function View() {
  const [notes, setNotes] = useAtom(notesAtom);
  const [prep, setPrep] = useAtom(viewPrepAtom);
  const [compact, toggleCompact] = useAtom(compactAtom);
  const [foodGroups, toggleFoodGroups] = useAtom(viewFoodGroupsAtom);
  return (
    <Menu closeOnItemClick={false}>
      <Menu.Target>
        <Button
          variant="subtle"
          leftSection={<IconEye size="1.4rem" />}
          visibleFrom="md"
        >
          View
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            notes ? <IconNotes size="1rem" /> : <IconNotesOff size="1rem" />
          }
          onClick={() => setNotes(!notes)}
        >
          Notes
        </Menu.Item>
        <Menu.Item
          leftSection={
            prep ? (
              <IconToolsKitchen size="1rem" />
            ) : (
              <IconToolsKitchenOff size="1rem" />
            )
          }
          onClick={() => setPrep(!prep)}
        >
          Prep
        </Menu.Item>
        <Menu.Item
          onClick={() => toggleFoodGroups()}
          leftSection={
            foodGroups ? <IconTags size="1rem" /> : <IconTagsOff size="1rem" />
          }
        >
          Food groups
        </Menu.Item>
        <Menu.Label>Layout</Menu.Label>
        <Menu.Item
          leftSection={compact ? <IconCheck size="1rem" /> : <Box w="1rem" />}
          onClick={() => toggleCompact()}
        >
          Compact
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export const Home = () => {
  const { isLoading } = api.user.collections.useQuery();
  const [currentSort, setSort] = useAtom(sortAtom);
  return (
    <>
      <Header>
        <Group justify="space-between">
          <Title order={2} size="h3" visibleFrom="xs">
            Home
          </Title>
          <Group justify="center" align="center">
            <Filter />
            <Menu>
              <Menu.Target>
                <Button
                  variant="subtle"
                  leftSection={<SortIcon type={currentSort} size="1.2rem" />}
                >
                  Sort
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {sorts.map((sort) => (
                  <Menu.Item
                    key={sort}
                    onClick={() => setSort(sort)}
                    leftSection={<SortIcon type={sort} size="1.2rem" />}
                    rightSection={
                      sort === currentSort ? <IconCheck size="1.2rem" /> : <></>
                    }
                  >
                    <SortName sort={sort} />
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            <View />
          </Group>
        </Group>
      </Header>
      <AppShell.Main>{isLoading ? <Loader /> : <List />}</AppShell.Main>
    </>
  );
};
