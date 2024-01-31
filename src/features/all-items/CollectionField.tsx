import { Loader, Select, Text } from "@mantine/core";
import { api } from "~/utils/api";
import { EditableCell } from "./EditableCell";
import { useField } from "./useField";

export function CollectionField({
  collectionName,
  collectionId,
  itemId,
}: {
  collectionName: string;
  collectionId: string;
  itemId: number;
}) {
  const { editing, close, inputProps, mutateAsync, cellProps } = useField();
  const handleChange = async (value: string | null) => {
    close();
    if (value) await mutateAsync({ collectionId: value, id: itemId });
  };
  const { data } = api.user.collections.useQuery();
  return (
    <div>
      {editing ? (
        data ? (
          <Select
            data={data.map(({ name, id }) => ({ value: id, label: name }))}
            value={collectionId}
            dropdownOpened={editing}
            onChange={handleChange}
            {...inputProps}
          />
        ) : (
          <Loader />
        )
      ) : (
        <EditableCell {...cellProps}>
          <Text fz="sm" c="dark">
            {collectionName}
          </Text>
        </EditableCell>
      )}
    </div>
  );
}
