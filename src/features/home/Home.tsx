import {
  AppShell,
  Group,
  Loader,
  SegmentedControl,
  Title,
} from "@mantine/core";
import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import { IconLayoutColumns, IconLayoutList } from "@tabler/icons-react";
import { atom, useAtom, useAtomValue } from "jotai";
import { List } from "./List";
import { Columns } from "./Columns";

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
  return (
    <>
      <Header>
        <Group justify="space-between">
          <Title order={2} size="h3">
            Home
          </Title>
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
      </Header>
      <AppShell.Main>
        {isLoading ? <Loader /> : <CollectionsLayout />}
      </AppShell.Main>
    </>
  );
};
