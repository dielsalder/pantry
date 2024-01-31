import { ActionIcon, Button, Group, Text, TextInput } from "@mantine/core";
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
  const { mutateAsync, isLoading } = api.item.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.user.items));
      await queryClient.invalidateQueries(getQueryKey(api.item.read, id));
    },
  });
  const handleSubmit = async () => {
    await mutateAsync({ id, name: value });
    setEditing(false);
  };
  const [focusInput, setFocusInput] = useState(false);
  const focusTrapRef = useFocusTrap(focusInput);
  const clickOutsideRef = useClickOutside(() => setEditing(false));
  const containerRef = useMergedRef(hoverRef, clickOutsideRef);
  return (
    <Group
      ref={containerRef}
      justify="space-between"
      onKeyDown={(event) => {
        if (event.key === "Escape") setEditing(false);
        else if (event.key === "Tab") setFocusInput(false);
      }}
    >
      {editing ? (
        <>
          <TextInput
            ref={focusTrapRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            w="6.5rem"
            onBlur={() => setFocusInput(false)}
            onKeyDown={async ({ key }) => {
              if (key === "Enter") await handleSubmit();
            }}
            data-autoFocus
          />
          <Group gap="xs">
            <ActionIcon
              size="sm"
              variant="subtle"
              onBlur={() => setEditing(false)}
              onClick={handleSubmit}
              loading={isLoading}
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
          onClick={() => {
            setEditing(true);
            setFocusInput(true);
          }}
        >
          <Text fz="sm" c="dark">
            {name}
          </Text>
        </Button>
      )}
    </Group>
  );
}