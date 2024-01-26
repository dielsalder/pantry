import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";

export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return api.collection.delete.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(getQueryKey(api.user.read));
    },
  });
}
