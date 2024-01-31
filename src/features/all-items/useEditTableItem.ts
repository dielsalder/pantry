import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";

export function useEditTableItem() {
  const queryClient = useQueryClient();
  return api.item.update.useMutation({
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries(getQueryKey(api.user.items));
      await queryClient.invalidateQueries(getQueryKey(api.item.read, id));
    },
  });
}
