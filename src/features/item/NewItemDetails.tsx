import { api } from "~/utils/api";
import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ItemDetails } from "./ItemDetails";
export function NewItemDetails({
  onSave,
  collectionId,
}: {
  onSave?: () => void;
  collectionId: string;
}) {
  const queryClient = useQueryClient();
  const { mutate } = api.item.create.useMutation({
    onSuccess: async () => {
      const queryKey = getQueryKey(api.collection.items, { id: collectionId });
      await queryClient.invalidateQueries(queryKey);
    },
  });
  const initialValues = {
    name: "",
    quantity: null,
    unit: null,
    foodGroups: [],
    collectionId,
    prep: null,
    perishable: false,
    notes: null,
  };
  return (
    <ItemDetails
      onSubmit={(data) => {
        mutate({ ...data, collectionId });
      }}
      onSave={onSave}
      initialValues={initialValues}
    />
  );
}
