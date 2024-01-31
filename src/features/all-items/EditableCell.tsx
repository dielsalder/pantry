import { Button, ButtonProps } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";

export function EditableCell(props: ButtonProps & { onClick: () => void }) {
  const { hovered, ref } = useHover<HTMLButtonElement>();
  return (
    <Button
      variant="transparent"
      rightSection={hovered && <IconPencil size="1.4rem" />}
      fullWidth
      justify="space-between"
      px={0}
      ref={ref}
      {...props}
    />
  );
}
