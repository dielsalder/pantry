import {
  ActionIcon,
  ActionIconGroup,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";

export function FoodGroup({ id }: { id: string }) {
  const { data } = api.foodGroup.read.useQuery(id);
  const [isEditing, { close: closeEdit, open: openEdit }] = useDisclosure();
  const form = useForm({ initialValues: data });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = api.foodGroup.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.foodGroup.read, id));
    },
  });

  const handleSubmit = () => {
    mutate({ ...form.values, id });
    console.log(form.values, id);
    closeEdit();
  };
  return isEditing ? (
    <Group justify="space-between">
      <TextInput {...form.getInputProps("name")} />
      <ActionIconGroup>
        <ActionIcon variant="subtle" onClick={closeEdit}>
          <IconX />
        </ActionIcon>
        <ActionIcon variant="subtle" loading={isLoading} onClick={handleSubmit}>
          <IconCheck />
        </ActionIcon>
      </ActionIconGroup>
    </Group>
  ) : (
    <Group justify="space-between">
      <Text>{data?.name}</Text>
      <ActionIcon variant="subtle" onClick={openEdit}>
        <IconPencil />
      </ActionIcon>
    </Group>
  );
}
