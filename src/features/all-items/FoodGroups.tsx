import { type FoodGroupIconType } from "@prisma/client";
import { useField } from "./useField";
import {
  Center,
  Chip,
  ChipGroup,
  Collapse,
  Group,
  Loader,
  Paper,
  Pill,
  Text,
  Transition,
} from "@mantine/core";
import { FoodGroupIcon } from "../settings/FoodGroupIcon";
import { EditableCell } from "./EditableCell";
import { api } from "~/utils/api";
import { useClickOutside } from "@mantine/hooks";

export function FoodGroups({
  foodGroups,
  itemId,
}: {
  foodGroups: { id: string; name: string; icon: FoodGroupIconType }[];
  itemId: number;
}) {
  const { data: allFoodGroups } = api.user.foodGroups.useQuery();
  const { editing, cellProps, mutateAsync, close, isLoading } = useField();
  // close on touch end so that the event for other input to open can fire
  const ref = useClickOutside(close, ["mouseup", "touchend"]);
  return (
    <>
      <Transition mounted={!editing} transition="fade" duration={20}>
        {(style) => (
          <EditableCell {...cellProps} style={style}>
            <Group justify="flex-start" gap="2px" wrap="wrap">
              {foodGroups.map(({ icon, name, id }) => (
                <Pill size="sm" key={id} fw={400}>
                  <Center>
                    <FoodGroupIcon
                      type={icon}
                      size="0.8rem"
                      style={{ marginRight: "2px" }}
                    />
                    {name}
                  </Center>
                </Pill>
              ))}
            </Group>
          </EditableCell>
        )}
      </Transition>
      <Collapse in={editing}>
        <Paper p="xs" withBorder ref={ref}>
          <Group wrap="nowrap">
            <ChipGroup
              multiple
              defaultValue={foodGroups.map((item) => item.id)}
              onChange={(value) =>
                mutateAsync({ id: itemId, foodGroups: value })
              }
            >
              <Group justify="flex-start" gap="2px" wrap="wrap">
                {allFoodGroups?.map(({ id, name, icon, color }) => (
                  <Chip key={id} value={id} color={color} size="xs">
                    <Group justify="center" gap="2px">
                      <FoodGroupIcon type={icon} size="1rem" />
                      <Text size="xs">{name}</Text>
                    </Group>
                  </Chip>
                ))}
              </Group>
            </ChipGroup>
            {isLoading && <Loader size="xs" />}
          </Group>
        </Paper>
      </Collapse>
    </>
  );
}
