import { ActionIcon, Loader, NumberInput, Text, Modal } from "@mantine/core";
import { api } from "~/utils/api";
import { IconPencil } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ItemDetails } from "./ItemDetails";
import { useEditItem } from "./useEditItem";
import { type PropsWithChildren, createContext, useContext } from "react";
const IdContext = createContext(0);
function Quantity() {
  const id = useContext(IdContext);
  const { mutate, isLoading } = useEditItem();
  const { data } = api.item.read.useQuery(id);
  return (
    <>
      {isLoading && <Loader size="sm" />}
      <NumberInput
        style={{ width: "10rem" }}
        value={data?.quantity ?? undefined}
        onChange={(value) => mutate({ id, quantity: value as number })}
        suffix={data?.unit ? ` ${data?.unit}` : ""}
      />
    </>
  );
}

function Edit() {
  const id = useContext(IdContext);
  const { mutate } = useEditItem();
  const { data } = api.item.read.useQuery(id);
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <ActionIcon aria-label="Edit" variant="subtle" onClick={open}>
        <IconPencil />
      </ActionIcon>
      <Modal opened={opened} onClose={close} my="lg" title="Edit item">
        {data ? (
          <ItemDetails
            initialValues={data}
            onSubmit={(data) => mutate({ ...data, id })}
            onSave={close}
          />
        ) : (
          <Loader />
        )}
      </Modal>
    </>
  );
}
function Name() {
  const id = useContext(IdContext);
  const { data } = api.item.read.useQuery(id);
  return <Text>{data?.name}</Text>;
}
export function Item({ id, children }: PropsWithChildren<{ id: number }>) {
  const { data } = api.item.read.useQuery(id);
  return data && <IdContext.Provider value={id}>{children}</IdContext.Provider>;
}
Item.Name = Name;
Item.Edit = Edit;
Item.Quantity = Quantity;
