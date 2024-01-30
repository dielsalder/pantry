import { ActionIcon, FocusTrap, Group, Text, TextInput } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function NameField({ name, id }: { name: string; id: number }) {
  const { hovered, ref } = useHover();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  useEffect(() => setValue(name), [name, setValue]);
  return (
    <Group ref={ref} justify="space-between">
      {editing ? (
        <>
          <FocusTrap>
            <TextInput
              value={value}
              w="6.5rem"
              onKeyDown={(event) => {
                if (event.key === "Escape") setEditing(false);
              }}
            />
          </FocusTrap>
          <Group gap="xs">
            <ActionIcon
              size="sm"
              variant="subtle"
              onBlur={() => setEditing(false)}
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
        <>
          <Text fz="sm">{name} </Text>
          {hovered && (
            <ActionIcon
              variant="transparent"
              size="sm"
              onClick={() => setEditing(true)}
            >
              <IconPencil />
            </ActionIcon>
          )}
        </>
      )}
    </Group>
  );
}
