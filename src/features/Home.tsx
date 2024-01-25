import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Loader,
  Menu,
  Modal,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Collection } from "./Collection";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { getQueryKey } from "@trpc/react-query";
import { IconLogout, IconUserFilled } from "@tabler/icons-react";

export const Home = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.user.read.useQuery();
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
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Title order={3}>jude food</Title>
          <Menu>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconUserFilled />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconLogout />}
                onClick={() => void signOut()}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap="lg">
          {isLoading ? (
            <Loader />
          ) : (
            data?.collections.map(({ id }) => <Collection id={id} key={id} />)
          )}
        </Stack>
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
