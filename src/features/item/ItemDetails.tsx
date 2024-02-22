import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { FoodGroupSelect } from "../FoodGroupSelect";
import { type FoodPrep } from "@prisma/client";
import { api } from "~/utils/api";

type ItemInput = {
  name: string;
  quantity: number | null;
  unit: string | null;
  foodGroups: string[];
  prep: FoodPrep | null;
  collectionId: string;
};
export function ItemDetails({
  onSave,
  onSubmit,
  initialValues,
}: {
  onSave?: () => void;
  onSubmit: (data: ItemInput) => void;
  initialValues?: ItemInput;
}) {
  const form = useForm({
    initialValues,
    validate: { name: (value) => value.length < 0 },
  });
  const { data: collections } = api.user.collections.useQuery();
  return (
    <Stack>
      <form
        onSubmit={form.onSubmit((data) => {
          onSubmit({ ...data });
          if (onSave) onSave();
        })}
      >
        <TextInput
          label="Name"
          {...form.getInputProps("name")}
          data-autoFocus
        />
        <Group>
          <NumberInput label="Quantity" {...form.getInputProps("quantity")} />
          <TextInput
            label="Unit"
            {...form.getInputProps("unit")}
            defaultValue={""}
          />
        </Group>
        <FoodGroupSelect {...form.getInputProps("foodGroups")} />
        <Select
          label="Prep"
          data={["Ingredient", "Partial", "Ready"]}
          {...form.getInputProps("prep")}
        />
        <Select
          label="Collection"
          data={collections?.map(({ name, id }) => ({
            value: id,
            label: name,
          }))}
          {...form.getInputProps("collectionId")}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="filled" color="blue" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
