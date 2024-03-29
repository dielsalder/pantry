import {
  ActionIcon,
  ActionIconGroup,
  Chip,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconCheck,
  IconCircleDashed,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";
import { FoodGroupIcon } from "./FoodGroupIcon";
import { FoodGroupIconSelect } from "./FoodGroupIconSelect";
import FoodGroupColorPicker from "./FoodGroupColorPicker";

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

  const { mutate: deleteFoodGroup } = api.foodGroup.delete.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.user.foodGroups));
    },
  });
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete food group",
      children: <Text>Really delete this food group?</Text>,
      onConfirm: () => deleteFoodGroup(id),
      confirmProps: { color: "red" },
      labels: { confirm: "Delete", cancel: "Cancel" },
    });

  const handleSubmit = () => {
    mutate({ ...form.values, id });
    closeEdit();
  };
  return (
    data &&
    (isEditing ? (
      <Group>
        <Group>
          <FoodGroupIconSelect {...form.getInputProps("icon")} />
          <TextInput {...form.getInputProps("name")} />
          <FoodGroupColorPicker {...form.getInputProps("color")} />
        </Group>
        <ActionIconGroup>
          <ActionIcon variant="subtle" color="red" onClick={openDeleteModal}>
            <IconTrash />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={closeEdit}>
            <IconX />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            loading={isLoading}
            onClick={handleSubmit}
          >
            <IconCheck />
          </ActionIcon>
        </ActionIconGroup>
      </Group>
    ) : (
      <Group>
        <Chip
          checked={true}
          color={data.color}
          variant="filled"
          icon={
            data?.icon ? (
              <FoodGroupIcon type={data?.icon} size="1rem" />
            ) : (
              <IconCircleDashed size="1rem" />
            )
          }
          size="md"
        >
          <Text fw={500}>{data?.name}</Text>
        </Chip>
        <ActionIcon variant="subtle" onClick={openEdit}>
          <IconPencil />
        </ActionIcon>
      </Group>
    ))
  );
}
