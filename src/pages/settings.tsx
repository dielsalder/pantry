import {
  AppShell,
  Button,
  Collapse,
  Group,
  Paper,
  Skeleton,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { type FoodGroup } from "@prisma/client";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";

function NewFoodGroup({ onSubmit }: { onSubmit?: () => void }) {
  const form = useForm<Omit<FoodGroup, "userId" | "id">>({
    initialValues: { name: "New Group" },
  });
  const queryClient = useQueryClient();
  const { mutate } = api.foodGroup.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.user.read));
      await queryClient.invalidateQueries(getQueryKey(api.user.foodGroups));
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(form.values);
        form.reset();
        if (onSubmit) onSubmit();
      }}
    >
      <Group justify="space-between">
        <TextInput {...form.getInputProps("name")} />
        <Button leftSection={<IconCheck />} type="submit">
          Save
        </Button>
      </Group>
    </form>
  );
}

function FoodGroups() {
  const { data, isLoading } = api.user.foodGroups.useQuery();
  const [opened, { open, close, toggle }] = useDisclosure();
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
          {data?.map(({ name }) => name)}
        </>
      )}
    </Stack>
  );
}
export default function Settings() {
  return (
    <>
      <Header>
        <Title order={2} size="h3">
          Settings
        </Title>
      </Header>
      <AppShell.Main>
        <FoodGroups />
      </AppShell.Main>
    </>
  );
}
