import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { useDeleteCollection } from "../useDeleteCollection";
import { api } from "~/utils/api";

export function useOpenDeleteModal(id: string) {
  const { mutate: deleteCollection } = useDeleteCollection();
  const { data } = api.collection.read.useQuery(id);
  return () =>
    modals.openConfirmModal({
      title: "Delete this collection",
      confirmProps: { color: "red" },
      children: (
        <Text size="sm">
          Really delete the collection {data?.name} and all its items?
        </Text>
      ),
      onConfirm: () => deleteCollection(id),
      labels: { confirm: "Delete", cancel: "Cancel" },
    });
}
