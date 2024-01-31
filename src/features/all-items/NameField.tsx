import { ActionIcon, Group, Text, TextInput } from "@mantine/core";
import { useClickOutside, useFocusTrap } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useEditTableItem } from "./useEditTableItem";
import { EditableCell } from "./EditableCell";

export function NameField({ name, id }: { name: string; id: number }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  useEffect(() => setValue(name), [name, setValue]);
  const { mutateAsync, isLoading } = useEditTableItem();
  const handleSubmit = async () => {
    await mutateAsync({ id, name: value });
    setEditing(false);
  };
  const [focusInput, setFocusInput] = useState(false);
  const focusTrapRef = useFocusTrap(focusInput);
  const clickOutsideRef = useClickOutside(() => setEditing(false));
  return (
    <Group
      ref={clickOutsideRef}
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
            data-autofocus
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
        <EditableCell
          onClick={() => {
            setEditing(true);
            setFocusInput(true);
          }}
        >
          <Text fz="sm" c="dark">
            {name}
          </Text>
        </EditableCell>
      )}
    </Group>
  );
}
