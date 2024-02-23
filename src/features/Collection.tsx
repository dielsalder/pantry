import React, {
  type PropsWithChildren,
  useContext,
  type FunctionComponent,
} from "react";
import { ActionIcon, Loader, Modal, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { NewItemDetails } from "./item/NewItemDetails";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";
import { useCollectionItems } from "./useCollectionItems";
export const CollectionContext = React.createContext({ id: "" });

function NewItem() {
  const { id } = useContext(CollectionContext);
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <ActionIcon onClick={open} size="lg" variant="subtle">
        <IconPlus />
      </ActionIcon>
      <Modal title="New Item" opened={opened} onClose={close}>
        <NewItemDetails onSave={close} collectionId={id} />
      </Modal>
    </>
  );
}

function Name() {
  const { id } = useContext(CollectionContext);
  const { data, isLoading } = api.collection.read.useQuery(id);
  return isLoading ? <Loader /> : <Title order={3}>{data?.name}</Title>;
}

function Items({
  Component,
}: {
  Component: FunctionComponent<Partial<Item> & { id: number }>;
}) {
  const { id } = useContext(CollectionContext);
  const { data, isLoading } = useCollectionItems(id);
  return isLoading ? (
    <Loader />
  ) : (
    <Stack>{data?.map((item) => <Component key={item.id} {...item} />)}</Stack>
  );
}

export function Collection({
  id,
  children,
}: PropsWithChildren<{ id: string }>) {
  return (
    <CollectionContext.Provider value={{ id }}>
      {children}
    </CollectionContext.Provider>
  );
}
Collection.Items = Items;
Collection.NewItem = NewItem;
Collection.Name = Name;
