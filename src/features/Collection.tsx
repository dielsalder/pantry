import { Button, Group, Loader, Modal, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Item } from "./Item";
import { NewItemDetails } from "./NewItemDetails";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/utils/api";

export function Collection({ id }: { id: string }) {
  const { data, isLoading } = api.collection.read.useQuery(id);
  const [opened, { open, close }] = useDisclosure();
  return isLoading ? (
    <Loader />
  ) : (
    <Stack>
      <Group justify="space-between" align="flex-start">
        <Title order={2} mb="lg">
          {data?.name}
        </Title>
        <Button onClick={open} leftSection={<IconPlus />}>
          Add
        </Button>
      </Group>
      <Stack>
        {data?.items.map((item) => <Item id={item.id} key={item.id} />)}
      </Stack>
      <Modal title="New Item" opened={opened} onClose={close}>
        <NewItemDetails onSave={close} collectionId={id} />
      </Modal>
    </Stack>
  );
}
