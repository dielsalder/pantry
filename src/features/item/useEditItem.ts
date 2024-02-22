import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";
export function useEditItem() {
  const queryClient = useQueryClient();
  return api.item.update.useMutation({
    onSuccess: async (data) => {
      const queryKey = getQueryKey(api.item.read, data.id);
      queryClient.setQueryData(queryKey, data);
      await queryClient.cancelQueries({ queryKey });
      await queryClient.invalidateQueries({ queryKey });
      await queryClient.invalidateQueries(getQueryKey(api.collection));
    },
  });
}
