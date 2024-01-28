import {
  AppShell,
  Button,
  Chip,
  ChipGroup,
  Flex,
  Group,
  Loader,
  Menu,
  SegmentedControl,
  Text,
  Title,
  Container,
  Popover,
  Stack,
} from "@mantine/core";
import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import {
  IconCheck,
  IconLayoutColumns,
  IconLayoutList,
} from "@tabler/icons-react";
import { atom, useAtom, useAtomValue } from "jotai";
import { List } from "./List";
import { Columns } from "./Columns";
import { SortIcon, SortName, sortAtom } from "./sortAtom";
import { sorts } from "~/server/api/routers/sort";
import { selectedFoodGroupsAtom } from "./selectedFoodGroups";
import { FoodGroupIcon } from "../settings/FoodGroupIcon";

const layoutAtom = atom("list");
export function CollectionsLayout() {
  const layout = useAtomValue(layoutAtom);
  if (layout === "list") return <List />;
  else if (layout === "column") return <Columns />;
  else return null;
}

function Filter() {
  const [selectedFoodGroups, setSelectedFoodGroups] = useAtom(
    selectedFoodGroupsAtom,
  );
  const { data, isLoading } = api.user.foodGroups.useQuery();
  return (
    <Popover position="bottom-start" width={280}>
      <Popover.Target>
        <Button variant="subtle">Filter</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <Text c="var(--mantine-color-dimmed)" size="xs" fw={500}>
            By food group
          </Text>
          <ChipGroup
            multiple
            value={selectedFoodGroups}
            onChange={setSelectedFoodGroups}
          >
            <Flex direction="row" wrap="wrap" gap="xs">
              {isLoading ? (
                <Loader />
              ) : (
                data?.map(({ id, name, color, icon }) => (
                  <Chip key={id} value={id} color={color} size="sm">
                    <Group justify="center" gap="4px">
                      <Text>{name}</Text>
                      <FoodGroupIcon type={icon} size="1rem" />
                    </Group>
                  </Chip>
                ))
              )}
            </Flex>
          </ChipGroup>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
export const Home = () => {
  const [layout, setLayout] = useAtom(layoutAtom);
  const { isLoading } = api.user.read.useQuery();
  const [currentSort, setSort] = useAtom(sortAtom);
  return (
    <>
      <Header>
        <Group justify="space-between">
          <Title order={2} size="h3">
            Home
          </Title>
          <Group>
            <Filter />
            <Menu position="bottom-start">
              <Menu.Target>
                <Button
                  variant="subtle"
                  rightSection={<SortIcon type={currentSort} />}
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
            <SegmentedControl
              size="xs"
              value={layout}
              onChange={setLayout}
              data={[
                { label: <IconLayoutList />, value: "list" },
                { label: <IconLayoutColumns />, value: "column" },
              ]}
            />
          </Group>
        </Group>
      </Header>
      <AppShell.Main>
        {isLoading ? <Loader /> : <CollectionsLayout />}
      </AppShell.Main>
    </>
  );
};
