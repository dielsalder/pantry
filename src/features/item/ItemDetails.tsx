import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Chip,
  ChipGroup,
  Group,
  InputWrapper,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
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
  perishable: boolean;
  notes: string | null;
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
    <form
      onSubmit={form.onSubmit((data) => {
        onSubmit({ ...data });
        if (onSave) onSave();
      })}
    >
      <Stack gap="xs">
        <TextInput
          label="Name"
          {...form.getInputProps("name")}
          data-autoFocus
        />
        <Group wrap="nowrap">
          <NumberInput label="Quantity" {...form.getInputProps("quantity")} />
          <TextInput
            label="Unit"
            {...form.getInputProps("unit")}
            defaultValue={""}
          />
          <Checkbox
            {...form.getInputProps("perishable")}
            label="Perishable"
            labelPosition="right"
            description="Does this item go bad soon?"
          />
        </Group>
        <FoodGroupSelect {...form.getInputProps("foodGroups")} />
        <InputWrapper label="Prep">
          <ChipGroup multiple={false} {...form.getInputProps("prep")}>
            <Group wrap="nowrap" gap="xs">
              <Chip value="ReadyToEat">Ready to eat</Chip>
              <Chip value="Partial">Partial</Chip>
              <Chip value="Ingredient">Ingredient</Chip>
            </Group>
          </ChipGroup>
        </InputWrapper>
        <Select
          label="Collection"
          data={collections?.map(({ name, id }) => ({
            value: id,
            label: name,
          }))}
          {...form.getInputProps("collectionId")}
        />

        <Textarea
          {...form.getInputProps("notes")}
          value={form.values.notes ?? undefined}
          label="Notes"
          autosize
          minRows={1}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="filled" color="blue" type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
