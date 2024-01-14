import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { type Item } from "@prisma/client";
export function ItemDetails({
  onSave,
  onSubmit,
  initialValues,
}: {
  onSave?: () => void;
  onSubmit: (data: Item) => void;
  initialValues?: Item;
}) {
  const form = useForm({
    initialValues,
  });
  return (
    <Stack>
      <form
        onSubmit={form.onSubmit((data) => {
          onSubmit({ ...data });
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
