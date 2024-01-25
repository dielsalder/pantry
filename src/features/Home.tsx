import {
  Accordion,
  AppShell,
  Button,
  Center,
  Group,
  Loader,
  Modal,
  SegmentedControl,
  SimpleGrid,
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
import {
  IconLayoutColumns,
  IconLayoutList,
  IconNewSection,
} from "@tabler/icons-react";
import { atom, useAtom, useAtomValue } from "jotai";
import { Item } from "./Item";

const layoutAtom = atom("list");
function ListItem({ id }: { id: number }) {
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
export function CollectionsLayout() {
  const layout = useAtomValue(layoutAtom);
  const { data } = api.user.read.useQuery();
  if (layout === "list")
    return (
      <Stack gap="lg">
        <Accordion
          multiple
          defaultValue={data?.collections.map(({ id }) => id)}
        >
          {data?.collections.map(({ id }) => (
            <Collection id={id} key={id}>
              <Accordion.Item key={id} value={id}>
                <Center>
                  <Accordion.Control>
                    <Collection.Name />
                  </Accordion.Control>
                  <Collection.NewItem />
                </Center>
                <Accordion.Panel>
                  <Collection.Items Component={ListItem} />
                </Accordion.Panel>
              </Accordion.Item>
            </Collection>
          ))}
        </Accordion>
        <NewCollection />
      </Stack>
    );
  else if (layout === "column")
    return (
      <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }}>
        {data?.collections.map(({ id }) => (
          <Collection id={id} key={id}>
            <Stack>
              <Group justify="space-between" align="stretch">
                <Collection.Name />
                <Collection.NewItem />
              </Group>
              <Collection.Items Component={ListItem} />
            </Stack>
          </Collection>
        ))}
        <NewCollection />
      </SimpleGrid>
    );
  else return null;
}

export function NewCollection() {
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
      <Button
        onClick={open}
        leftSection={<IconNewSection />}
        variant="outline"
        size="l"
      >
        New collection
      </Button>
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
    </>
  );
}
export const Home = () => {
  const [layout, setLayout] = useAtom(layoutAtom);
  const { isLoading } = api.user.read.useQuery();
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
      </AppShell.Main>
    </>
  );
};
