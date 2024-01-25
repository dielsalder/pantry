import React, { PropsWithChildren, useContext } from "react";
import { Button, Group, Loader, Modal, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Item } from "./Item";
import { NewItemDetails } from "./NewItemDetails";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/utils/api";
const CollectionContext = React.createContext({ id: "" });

function NewItem() {
  const { id } = useContext(CollectionContext);
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <Button onClick={open} leftSection={<IconPlus />}>
        Add
      </Button>
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

function Items() {
  const { id } = useContext(CollectionContext);
  const { data, isLoading } = api.collection.read.useQuery(id);
  return isLoading ? (
    <Loader />
  ) : (
    <Stack>
      {data?.items.map((item) => <Item id={item.id} key={item.id} />)}
    </Stack>
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
