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
import { useAtomValue } from "jotai";
import { sortAtom } from "./home/sortAtom";
import { selectedFoodGroupsAtom } from "./home/selectedFoodGroups";
import { type Item } from "@prisma/client";
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
  const sort = useAtomValue(sortAtom);
  const selectedFoodGroups = useAtomValue(selectedFoodGroupsAtom);
  const { data, isLoading } = api.collection.items.useQuery(
    {
      id,
      sort,
    },
    {
      keepPreviousData: true,
      select: (data) => {
        if (selectedFoodGroups.length) {
          return data.filter((item) => {
            for (const foodGroup of item.foodGroups) {
              if (selectedFoodGroups.includes(foodGroup.id)) return true;
            }
            return false;
          });
        } else return data;
      },
    },
  );
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
