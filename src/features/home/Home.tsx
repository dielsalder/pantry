import {
  AppShell,
  Button,
  Group,
  Loader,
  Menu,
  SegmentedControl,
  Title,
} from "@mantine/core";
import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import {
  IconApple,
  IconLayoutColumns,
  IconLayoutList,
  IconList,
  IconSortAZ,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { List } from "./List";
import { Columns } from "./Columns";
import { Sort } from "~/server/api/routers/collection";

export const sortAtom = atom<Sort>("name");
const layoutAtom = atom("list");
export function CollectionsLayout() {
  const layout = useAtomValue(layoutAtom);
  if (layout === "list") return <List />;
  else if (layout === "column") return <Columns />;
  else return null;
}
export const Home = () => {
  const [layout, setLayout] = useAtom(layoutAtom);
  const { isLoading } = api.user.read.useQuery();
  const setSort = useSetAtom(sortAtom);
  return (
    <>
      <Header>
        <Group justify="space-between">
          <Title order={2} size="h3">
            Home
          </Title>
          <Group>
            <Menu position="bottom-start">
              <Menu.Target>
                <Button variant="subtle" leftSection={<IconList />}>
                  Sort
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => setSort("name")}
                  leftSection={<IconSortAZ size="1.2rem" />}
                >
                  Name
                </Menu.Item>
                <Menu.Item
                  onClick={() => setSort("foodGroup")}
                  leftSection={<IconApple size="1.2rem" />}
                >
                  Food groups
                </Menu.Item>
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
