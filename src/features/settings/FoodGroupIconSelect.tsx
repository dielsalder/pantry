import {
  Center,
  CheckIcon,
  Combobox,
  Group,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { FoodGroupIcon, foodGroupIcons } from "./FoodGroupIcon";
import { FoodGroupIconType } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";

export function FoodGroupIconSelect({
  value,
  onChange,
}: {
  value: FoodGroupIconType | null;
  onChange: (value: FoodGroupIconType) => void;
}) {
  const combobox = useCombobox();
  const options = foodGroupIcons.map((icon) => (
    <Combobox.Option value={icon} key={icon} active={icon === value}>
      <FoodGroupIcon type={icon} size="1.2rem" />
    </Combobox.Option>
  ));
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        onChange(value as FoodGroupIconType);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value ? (
            <Center>
              <FoodGroupIcon type={value} size="1.2rem" />
            </Center>
          ) : (
            <Input.Placeholder>Icon</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
