import { FocusTrap, Loader, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/utils/api";
import { useEditTableItem } from "./useEditTableItem";
import { EditableCell } from "./EditableCell";

export function CollectionField({
  collectionName,
  collectionId,
  itemId,
}: {
  collectionName: string;
  collectionId: string;
  itemId: number;
}) {
  const [editing, { open, close, toggle }] = useDisclosure();
  const { mutateAsync, isLoading } = useEditTableItem();
  const handleChange = async (value: string | null) => {
    close();
    if (value) await mutateAsync({ collectionId: value, id: itemId });
  };
  const { data } = api.user.collections.useQuery();
  return (
    <div>
      {editing ? (
        data ? (
          <FocusTrap>
            <Select
              data={data.map(({ name, id }) => ({ value: id, label: name }))}
              value={collectionId}
              dropdownOpened={editing}
              onChange={handleChange}
              onClick={toggle}
              onBlur={close}
            />
          </FocusTrap>
        ) : (
          <Loader />
        )
      ) : (
        <EditableCell onClick={open} loading={isLoading}>
          <Text fz="sm" c="dark">
            {collectionName}
          </Text>
        </EditableCell>
      )}
    </div>
  );
}
