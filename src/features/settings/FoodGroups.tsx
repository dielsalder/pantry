import { Button, Collapse, Group, Skeleton, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconX } from "@tabler/icons-react";
import { api } from "~/utils/api";
import { NewFoodGroup } from "~/features/settings/NewFoodGroup";
import { FoodGroup } from "./FoodGroup";

export function FoodGroups() {
  const { data, isLoading } = api.user.foodGroups.useQuery();
  const [opened, { close, toggle }] = useDisclosure();
  return (
    <Stack gap="l">
      <Group justify="space-between">
        <Title order={3}>Food Groups</Title>
        <Button
          variant="subtle"
          leftSection={opened ? <IconX /> : <IconPlus />}
          onClick={toggle}
        >
          {opened ? "Cancel" : "New"}
        </Button>
      </Group>
      {isLoading ? (
        <Skeleton height={40} />
      ) : (
        <>
          <Collapse in={opened}>
            <NewFoodGroup onSubmit={close} />
          </Collapse>
          {data?.map(({ id }) => <FoodGroup id={id} key={id} />)}
        </>
      )}
    </Stack>
  );
}
