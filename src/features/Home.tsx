import {
  AppShell,
  Button,
  Group,
  Loader,
  Modal,
  SegmentedControl,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { api } from "~/utils/api";
import { Collection } from "./Collection";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { getQueryKey } from "@trpc/react-query";
import { Header } from "~/components/Header";
import { IconLayoutColumns, IconLayoutList } from "@tabler/icons-react";
import { atom, useAtom, useAtomValue } from "jotai";

const layoutAtom = atom("list");
export function CollectionsLayout() {
  const layout = useAtomValue(layoutAtom);
  const { data } = api.user.read.useQuery();
  if (layout === "list")
    return (
      <Stack gap="lg">
        {data?.collections.map(({ id }) => <Collection id={id} key={id} />)}
      </Stack>
    );
  else if (layout === "column")
    return (
      <Group gap="lg">
        {data?.collections.map(({ id }) => <Collection id={id} key={id} />)}
      </Group>
    );
  else return null;
}
export const Home = () => {
  const [layout, setLayout] = useAtom(layoutAtom);
  const { isLoading } = api.user.read.useQuery();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: { name: "" },
    validate: {
      name: (value) => (value.length < 1 ? "Please enter name" : null),
    },
  });
  const { mutate } = api.collection.create.useMutation({
    onSuccess: () => queryClient.invalidateQueries(getQueryKey(api.user.read)),
  });
  return (
    <>
      <Header>
        <Group justify="space-between">
          <Title order={3}>Home</Title>
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
        <Button onClick={open}>New Collection</Button>
        <Modal opened={opened} onClose={close} title="New Collection">
          <form
            onSubmit={form.onSubmit((data) => {
              mutate(data.name);
              close();
            })}
          >
            <TextInput label="Name" {...form.getInputProps("name")} />
            <Group justify="flex-end" mt="md">
              <Button variant="filled" color="blue" type="submit">
                Save
              </Button>
            </Group>
          </form>
        </Modal>
      </AppShell.Main>
    </>
  );
};
