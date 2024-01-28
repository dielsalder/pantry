import {
  ActionIcon,
  Loader,
  NumberInput,
  Text,
  Modal,
  Pill,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import { api } from "~/utils/api";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ItemDetails } from "./ItemDetails";
import { useEditItem } from "./useEditItem";
import { type PropsWithChildren, createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { FoodGroupIcon } from "./settings/FoodGroupIcon";
import { useAtomValue } from "jotai";
import { selectedFoodGroupsAtom } from "./home/selectedFoodGroups";
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

function Delete() {
  const id = useContext(IdContext);
  const queryClient = useQueryClient();
  const items = getQueryKey(api.user.items);
  const { mutate, isLoading } = api.item.delete.useMutation({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(items);
      await queryClient.invalidateQueries(
        getQueryKey(api.collection.read, data.collectionId),
      );
    },
  });
  return (
    <ActionIcon
      color="red"
      variant="subtle"
      onClick={() => mutate(id)}
      loading={isLoading}
    >
      <IconTrash />
    </ActionIcon>
  );
}

function FoodGroups() {
  const id = useContext(IdContext);
  const { data } = api.item.read.useQuery(id);
  const selected = useAtomValue(selectedFoodGroupsAtom);
  return (
    <>
      {data?.foodGroups.map(({ icon, id, name, color }) => (
        <Tooltip label={name} key={id} openDelay={200}>
          <Pill size="md" py={2} bg={selected.includes(id) ? color : ""}>
            <FoodGroupIcon
              type={icon}
              size="1rem"
              color={
                selected.includes(id) ? "white" : "var(--mantine-color-dimmed)"
              }
            />
          </Pill>
        </Tooltip>
      ))}
    </>
  );
}

function Edit() {
  const id = useContext(IdContext);
  const { mutate, isLoading } = useEditItem();
  const { data } = api.item.read.useQuery(id);
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <ActionIcon
        aria-label="Edit"
        variant="subtle"
        onClick={open}
        loading={isLoading}
      >
        <IconPencil />
      </ActionIcon>
      <Modal opened={opened} onClose={close} my="lg" title="Edit item">
        {data ? (
          <ItemDetails
            initialValues={{
              ...data,
              foodGroups: data.foodGroups.map(({ id }) => id),
            }}
            onSubmit={(values) => mutate({ ...values, id })}
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
Item.Delete = Delete;
Item.FoodGroups = FoodGroups;
