import { Group, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type FoodGroup } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";

export function NewFoodGroup({ onSubmit }: { onSubmit?: () => void }) {
  const form = useForm<Omit<FoodGroup, "userId" | "id">>({
    initialValues: { name: "New Group" },
  });
  const queryClient = useQueryClient();
  const { mutate } = api.foodGroup.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.user.read));
      await queryClient.invalidateQueries(getQueryKey(api.user.foodGroups));
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(form.values);
        form.reset();
        if (onSubmit) onSubmit();
      }}
    >
      <Group justify="space-between">
        <TextInput {...form.getInputProps("name")} />
        <Button leftSection={<IconCheck />} type="submit">
          Save
        </Button>
      </Group>
    </form>
  );
}
