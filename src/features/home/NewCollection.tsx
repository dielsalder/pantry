import { Button, Group, Modal, TextInput } from "@mantine/core";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { getQueryKey } from "@trpc/react-query";
import { IconNewSection } from "@tabler/icons-react";

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
    onSuccess: () =>
      queryClient.invalidateQueries(getQueryKey(api.user.collections)),
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
