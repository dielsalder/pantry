import { useForm } from "@mantine/form";
import { useEditItem } from "../item/useEditItem";
import { useState } from "react";
import { Button, Loader, Select, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import {
  useClickOutside,
  useDisclosure,
  useHover,
  useMergedRef,
} from "@mantine/hooks";
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
  const clickOutsideRef = useClickOutside(() => closeInput());
  const { data } = api.user.collections.useQuery();
  const { hovered, ref: hoverRef } = useHover();
  return (
    <div ref={hoverRef}>
      {editing ? (
        data ? (
          <Select
            data={data.map(({ name, id }) => ({ value: id, label: name }))}
            value={collectionId}
            dropdownOpened={editing}
            onChange={handleChange}
            // ref={clickOutsideRef}
            onClick={toggleInput}
          />
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
