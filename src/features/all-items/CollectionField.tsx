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
  const [editing, { open, close, toggle }] = useDisclosure();
  const { hovered, ref: hoverRef } = useHover();
  const { mutateAsync, isLoading } = useEditTableItem();
  const handleChange = async (value: string | null) => {
    close();
    if (value) await mutateAsync({ collectionId: value, id: itemId });
  };
  const { data } = api.user.collections.useQuery();
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
              onClick={toggle}
              onBlur={close}
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
          onClick={open}
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
