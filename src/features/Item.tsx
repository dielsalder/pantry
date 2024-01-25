import {
  ActionIcon,
  Flex,
  Loader,
  NumberInput,
  Text,
  Modal,
} from "@mantine/core";
import { api } from "~/utils/api";
import { IconPencil } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ItemDetails } from "./ItemDetails";
import { useEditItem } from "./useEditItem";
export function Item({ id }: { id: number }) {
  const { data } = api.item.read.useQuery(id);
  const { mutate, isLoading } = useEditItem();
  const [opened, { open, close }] = useDisclosure();
  return (
    data && (
      <>
        <Flex justify="space-between" align="center">
          <Text>{data.name}</Text>
          <Flex align="center" gap="sm">
            {isLoading && <Loader size="sm" />}
            <NumberInput
              value={data.quantity ?? undefined}
              onChange={(value) => mutate({ id, quantity: value as number })}
              suffix={data.unit ? ` ${data.unit}` : ""}
            />
            <ActionIcon aria-label="Edit" variant="subtle" onClick={open}>
              <IconPencil />
            </ActionIcon>
          </Flex>
        </Flex>
        <Modal opened={opened} onClose={close} my="lg" title="Edit item">
          <ItemDetails
            initialValues={data}
            onSubmit={(data) => mutate({ ...data, id })}
            onSave={close}
          />
        </Modal>
      </>
    )
  );
}
