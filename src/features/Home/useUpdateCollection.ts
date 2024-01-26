import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return api.collection.update.useMutation({
    onSuccess: async (data) => {
      const collectionQueryKey = getQueryKey(api.collection.read, data.id);
      queryClient.setQueryData(collectionQueryKey, data);
      await queryClient.cancelQueries(collectionQueryKey);
      await queryClient.invalidateQueries(collectionQueryKey);
    },
  });
}
