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
import { IconLayoutColumns, IconLayoutList } from "@tabler/icons-react";
import { atom, useAtom, useAtomValue } from "jotai";
import { List } from "./List";
import { Columns } from "./Columns";
import { SortIcon, sortAtom } from "./sortAtom";

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
  const [sort, setSort] = useAtom(sortAtom);
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
                <Button
                  variant="subtle"
                  rightSection={<SortIcon type={sort} />}
                >
                  Sort by
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => setSort("name")}
                  leftSection={<SortIcon type="name" size="1.2rem" />}
                >
                  Name
                </Menu.Item>
                <Menu.Item
                  onClick={() => setSort("foodGroup")}
                  leftSection={<SortIcon type="foodGroup" size="1.2rem" />}
                >
                  Food group
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setSort("oldestFirst");
                  }}
                  leftSection={<SortIcon type="oldestFirst" size="1.2rem" />}
                >
                  Oldest first
                </Menu.Item>
                <Menu.Item
                  onClick={() => setSort("newestFirst")}
                  leftSection={<SortIcon type="newestFirst" size="1.2rem" />}
                >
                  Newest first
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
