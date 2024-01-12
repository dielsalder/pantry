import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { Item } from "@prisma/client";
import { api } from "~/utils/api";
import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userAtom } from "~/user";
export function NewItemDetails({ onSave }: { onSave?: () => void }) {
  const userId = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const { mutate } = api.item.create.useMutation({
    onSuccess: () => {
      const queryKey = getQueryKey(api.user.pantry, userId);
      queryClient.invalidateQueries(queryKey);
    },
  });
  const initialValues = {
    name: "",
    quantity: null,
    unit: null,
    collectionId: userId,
  };
  const form = useForm({
    initialValues,
    validate: { name: (value) => value.length < 0 },
  });
  return (
    <Stack>
      <form
        onSubmit={form.onSubmit((data) => {
          mutate({ ...data });
          if (onSave) onSave();
        })}
      >
        <TextInput label="Name" {...form.getInputProps("name")} />
        <Group>
          <NumberInput label="Quantity" {...form.getInputProps("quantity")} />
          <TextInput
            label="Unit"
            {...form.getInputProps("unit")}
            defaultValue={""}
          />
        </Group>
        <Group justify="flex-end" mt="md">
          <Button variant="filled" color="blue" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
