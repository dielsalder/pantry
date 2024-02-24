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
  Text,
  RadioGroup,
  Radio,
  Tooltip,
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
  const { data: foodGroups } = api.user.foodGroups.useQuery();
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
        </Group>
        <InputWrapper label="Food groups">
          <ChipGroup multiple {...form.getInputProps("foodGroups")}>
            <Group justify="flex-start" gap="xs" wrap="wrap">
              {foodGroups?.map(({ id, name, color }) => (
                <Chip key={id} value={id} color={color} size="sm">
                  <Group justify="center" gap="2px">
                    <Text size="sm">{name}</Text>
                  </Group>
                </Chip>
              ))}
            </Group>
          </ChipGroup>
        </InputWrapper>
        <RadioGroup name="prep" label="Prep" {...form.getInputProps("prep")}>
          <Group wrap="nowrap" align="start">
            <Radio value="ReadyToEat" label="Ready" labelPosition="right" />
            <Radio value="Partial" label="Partial" labelPosition="right" />
            <Radio
              value="Ingredient"
              label="Ingredient"
              labelPosition="right"
            />
            <Checkbox
              {...form.getInputProps("perishable")}
              label="Perishable"
              labelPosition="right"
              description="Does this item go bad soon?"
            />
          </Group>
        </RadioGroup>
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
