import { Loader, NumberInput } from "@mantine/core";
import { useField } from "./useField";
import { useFocusWithin } from "@mantine/hooks";

export function Quantity({
  quantity,
  id,
}: {
  quantity: number | null;
  id: number;
}) {
  const { inputProps, mutateAsync, isLoading } = useField();
  const { ref, focused } = useFocusWithin();
  const handleChange = async (value: number | string | null) => {
    if (value) await mutateAsync({ id, quantity: value as number });
  };
  return (
    <NumberInput
      {...inputProps}
      rightSection={isLoading && <Loader size="xs" />}
      onChange={handleChange}
      value={quantity ?? undefined}
      variant={focused ? "default" : "unstyled"}
      hideControls={!focused}
      allowDecimal={false}
      ref={ref}
    />
  );
}
