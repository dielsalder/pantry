import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { ItemDetails } from "../item/ItemDetails";
import { useEditItem } from "../item/useEditItem";
import { type ItemPayload } from "~/pages/all-items";

export const Actions = (item: ItemPayload) => {
  const [opened, { open, close }] = useDisclosure();
  const { mutate, isLoading } = useEditItem();
  return (
    <>
      <ActionIcon onClick={open} loading={isLoading} variant="light">
        <IconPencil />
      </ActionIcon>
      <Modal opened={opened} onClose={close} my="lg" title="Edit item">
        <ItemDetails
          initialValues={{
            ...item,
            foodGroups: item.foodGroups.map(({ id }) => id),
          }}
          onSubmit={(values) => mutate({ ...values, id: item.id })}
          onSave={close}
        />
      </Modal>
    </>
  );
};
