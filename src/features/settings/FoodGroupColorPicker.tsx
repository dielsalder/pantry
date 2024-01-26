import { ColorInput, ColorInputProps, useMantineTheme } from "@mantine/core";

export default function FoodGroupColorPicker(props: ColorInputProps) {
  const { colors } = useMantineTheme();
  const swatches = [
    colors.gray[4],
    colors.gray[6],
    colors.red[6],
    colors.pink[6],
    colors.grape[6],
    colors.violet[6],
    colors.indigo[6],
    colors.blue[6],
    colors.cyan[6],
    colors.teal[6],
    colors.green[6],
    colors.lime[6],
    colors.yellow[6],
    colors.orange[6],
  ];
  return (
    <ColorInput
      {...props}
      withEyeDropper={false}
      swatches={swatches}
      closeOnColorSwatchClick
    />
  );
}
