import { Button, FocusTrap, Loader, Select, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useDisclosure, useHover } from "@mantine/hooks";
import { api } from "~/utils/api";
import { useEditTableItem } from "./useEditTableItem";

export function CollectionField({
  collectionName,
  collectionId,
  itemId,
}: {
  collectionName: string;
  collectionId: string;
  itemId: number;
}) {
  const [editing, { open: openInput, close: closeInput, toggle: toggleInput }] =
    useDisclosure();
  const { mutateAsync, isLoading } = useEditTableItem();
  const handleChange = async (value: string | null) => {
    closeInput();
    if (value) await mutateAsync({ collectionId: value, id: itemId });
  };
  const { data } = api.user.collections.useQuery();
  const { hovered, ref: hoverRef } = useHover();
  return (
    <div ref={hoverRef}>
      {editing ? (
        data ? (
          <FocusTrap>
            <Select
              data={data.map(({ name, id }) => ({ value: id, label: name }))}
              value={collectionId}
              dropdownOpened={editing}
              onChange={handleChange}
              onClick={toggleInput}
              onBlur={closeInput}
            />
          </FocusTrap>
        ) : (
          <Loader />
        )
      ) : (
        <Button
          variant="transparent"
          rightSection={hovered && <IconPencil size="1.4rem" />}
          fullWidth
          justify="space-between"
          px={0}
          onClick={() => {
            openInput();
          }}
          loading={isLoading}
        >
          <Text fz="sm" c="dark">
            {collectionName}
          </Text>
        </Button>
      )}
    </div>
  );
}
