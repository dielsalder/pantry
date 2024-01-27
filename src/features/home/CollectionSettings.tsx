import { isNotEmpty, useForm } from "@mantine/form";
import { type Collection } from "@prisma/client";
import { useUpdateCollection } from "./useUpdateCollection";
import { Button, Group, Stack, TextInput } from "@mantine/core";

export function CollectionSettings({
  initialValues,
  onSave,
  onCancel,
}: {
  initialValues: Collection;
  onSave: () => void;
  onCancel: () => void;
}) {
  const form = useForm({
    initialValues,
    validate: { name: isNotEmpty("Please enter name") },
  });
  const { mutate } = useUpdateCollection();
  const handleSave = () => {
    mutate({ ...form.values });
    if (onSave) onSave();
  };
  return (
    <Stack>
      <TextInput label="Name" {...form.getInputProps("name")} />
      <Group>
        <Button onClick={handleSave}>Save</Button>
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
}
