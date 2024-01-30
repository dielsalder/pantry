import {
  ActionIcon,
  Button,
  FocusTrap,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import {
  useClickOutside,
  useFocusTrap,
  useHover,
  useMergedRef,
} from "@mantine/hooks";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export function NameField({ name, id }: { name: string; id: number }) {
  const { hovered, ref: hoverRef } = useHover();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  useEffect(() => setValue(name), [name, setValue]);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = api.item.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.user.items));
      await queryClient.invalidateQueries(getQueryKey(api.item.read, id));
    },
  });
  const handleSubmit = () => {
    mutate({ id, name: value });
    setEditing(false);
  };
  const [focusInput, setFocusInput] = useState(false);
  const focusTrapRef = useFocusTrap(true);
  const clickOutsideRef = useClickOutside(() => setEditing(false));
  const ref = useMergedRef(hoverRef, clickOutsideRef);
  return (
    <Group ref={ref} justify="space-between">
      {editing ? (
        <>
          <TextInput
            value={value}
            onChange={(event) => setValue(event.target.value)}
            w="6.5rem"
            onKeyDown={(event) => {
              if (event.key === "Escape") setEditing(false);
            }}
            data-autoFocus
          />
          <Group gap="xs">
            <ActionIcon
              size="sm"
              variant="subtle"
              onBlur={() => setEditing(false)}
              onClick={handleSubmit}
            >
              <IconCheck />
            </ActionIcon>
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={() => {
                setValue(name);
                setEditing(false);
              }}
              onBlur={() => setEditing(false)}
            >
              <IconX />
            </ActionIcon>
          </Group>
        </>
      ) : (
        <Button
          variant="transparent"
          rightSection={hovered && <IconPencil size="1.4rem" />}
          fullWidth
          justify="space-between"
          px={0}
          onClick={() => setEditing(true)}
        >
          <Text fz="sm" c="dark">
            {name}
          </Text>
        </Button>
      )}
    </Group>
  );
}
