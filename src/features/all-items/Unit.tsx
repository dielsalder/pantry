import { Loader, TextInput } from "@mantine/core";
import { useField } from "./useField";
import { useFocusWithin } from "@mantine/hooks";

export function Unit({ unit, id }: { unit: string | null; id: number }) {
  const { mutateAsync, isLoading } = useField();
  const { ref, focused } = useFocusWithin();
  return (
    <TextInput
      variant={focused ? "default" : "unstyled"}
      value={unit ?? undefined}
      rightSection={isLoading && <Loader size="xs" />}
      onChange={(event) => mutateAsync({ id, unit: event.target.value })}
      ref={ref}
    />
  );
}
