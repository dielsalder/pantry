import { ActionIcon, Group, Text, TextInput } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { EditableCell } from "./EditableCell";
import { useField } from "./useField";

export function NameField({ name, id }: { name: string; id: number }) {
  const { editing, focusTrapRef, open, close, mutateAsync, isLoading } =
    useField();
  const [value, setValue] = useState(name);
  useEffect(() => setValue(name), [name, setValue]);
  const handleSubmit = async () => {
    await mutateAsync({ id, name: value });
    close();
  };
  const clickOutsideRef = useClickOutside(() => close());
  return (
    <Group
      ref={clickOutsideRef}
      justify="space-between"
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      {editing ? (
        <>
          <TextInput
            value={value}
            onChange={(event) => setValue(event.target.value)}
            w="6.5rem"
            onBlur={close}
            ref={focusTrapRef}
            onKeyDown={async ({ key }) => {
              if (key === "Enter") await handleSubmit();
            }}
          />
          <Group gap="xs">
            <ActionIcon
              size="sm"
              variant="subtle"
              onBlur={close}
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
                close();
              }}
              onBlur={close}
            >
              <IconX />
            </ActionIcon>
          </Group>
        </>
      ) : (
        <EditableCell onClick={open}>
          <Text fz="sm" c="dark">
            {name}
          </Text>
        </EditableCell>
      )}
    </Group>
  );
}
