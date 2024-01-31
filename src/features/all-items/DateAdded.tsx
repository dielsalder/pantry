import { format } from "date-fns";
import { useField } from "./useField";
import { Text } from "@mantine/core";
import { EditableCell } from "./EditableCell";
import { DateInput } from "@mantine/dates";
export function DateAdded({ value, itemId }: { value: Date; itemId: number }) {
  const { editing, cellProps, inputProps, mutateAsync, close } = useField();
  const handleChange = async (value: Date | null) => {
    close();
    if (value) await mutateAsync({ id: itemId, createdAt: value });
  };
  return editing ? (
    <DateInput
      {...inputProps}
      value={value}
      valueFormat="M/D/YYYY"
      onChange={handleChange}
      popoverProps={{ opened: editing }}
    />
  ) : (
    <EditableCell {...cellProps}>
      <Text fz="sm" c="dark">
        {format(value, "M/d/yyyy")}
      </Text>
    </EditableCell>
  );
}
