import { MultiSelect, type MultiSelectProps } from "@mantine/core";
import { api } from "~/utils/api";

export function FoodGroupSelect(props: MultiSelectProps) {
  const { data } = api.user.foodGroups.useQuery();
  return (
    data && (
      <MultiSelect
        label="Food groups"
        {...props}
        data={data?.map((foodGroup) => ({
          label: foodGroup.name,
          value: foodGroup.id,
        }))}
        clearable
      />
    )
  );
}
