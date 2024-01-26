import {
  Center,
  CloseButton,
  Combobox,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { FoodGroupIcon, foodGroupIcons } from "./FoodGroupIcon";
import { type FoodGroupIconType } from "@prisma/client";
import { IconCircleDashed } from "@tabler/icons-react";

export function FoodGroupIconSelect({
  value,
  onChange,
}: {
  value?: FoodGroupIconType | null;
  onChange: (value: FoodGroupIconType | null) => void;
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
          rightSection={
            value !== null ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onChange(null)}
                aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          rightSectionPointerEvents={value === null ? "none" : "all"}
          onClick={() => combobox.toggleDropdown()}
        >
          {value ? (
            <Center>
              <FoodGroupIcon type={value} size="1.2rem" />
            </Center>
          ) : (
            <Input.Placeholder>
              <Center>
                <IconCircleDashed size="1.2rem" />
              </Center>
            </Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
