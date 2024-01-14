import { useAtomValue } from "jotai";
import Head from "next/head";
import { userAtom } from "~/user";
import {
  AppShell,
  Button,
  Group,
  Loader,
  Modal,
  TextInput,
  Title,
} from "@mantine/core";

import { api } from "~/utils/api";
import { Collection } from "~/features/Collection";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

export default function Home() {
  const userId = useAtomValue(userAtom);
  const { data, isLoading } = api.user.read.useQuery(userId);
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: { name: "" },
    validate: {
      name: (value) => (value.length < 1 ? "Please enter name" : null),
    },
  });
  const { mutate } = api.collection.create.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries(getQueryKey(api.user.read, userId)),
  });

  return (
    <>
      <Head>
        <title>pantry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell header={{ height: "60" }} p="md">
        <AppShell.Header p="md">
          <Title order={3}>jude food</Title>
        </AppShell.Header>
        <AppShell.Main>
          {isLoading ? (
            <Loader />
          ) : (
            data?.collections.map(({ id }) => <Collection id={id} key={id} />)
          )}
          <Button onClick={open}>New Collection</Button>
          <Modal opened={opened} onClose={close} title="New Collection">
            <form
              onSubmit={form.onSubmit((data) => {
                mutate({ ...data, userId });
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
      </AppShell>
    </>
  );
}
