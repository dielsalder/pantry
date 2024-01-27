import {
  Group,
  TextInput,
  Button,
  Select,
  useMantineTheme,
  ColorInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type FoodGroup } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";
import { FoodGroupIconSelect } from "./FoodGroupIconSelect";
import FoodGroupColorPicker from "./FoodGroupColorPicker";

export function NewFoodGroup({ onSubmit }: { onSubmit?: () => void }) {
  const { colors } = useMantineTheme();
  const form = useForm<Omit<FoodGroup, "userId" | "id" | "itemId">>({
    initialValues: {
      name: "New Group",
      icon: "Apple",
      color: colors.gray[3],
    },
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
      <Group>
        <Group>
          <FoodGroupIconSelect
            value={form.values.icon}
            {...form.getInputProps("icon")}
          />
          <TextInput {...form.getInputProps("name")} />
          <FoodGroupColorPicker {...form.getInputProps("color")} />
        </Group>
        <Button leftSection={<IconCheck />} type="submit">
          Save
        </Button>
      </Group>
    </form>
  );
}
