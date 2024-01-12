import { Flex, NumberInput, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "~/utils/api";

export function Item({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { data } = api.item.read.useQuery(id);
  const { mutate } = api.item.update.useMutation({
    onSuccess: () => {
      const queryKey = getQueryKey(api.item.read, id);
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return (
    data && (
      <Flex justify="space-between" align="flex-start">
        <Text>{data.name}</Text>
        <NumberInput
          value={data.quantity ?? undefined}
          onChange={(value) => mutate({ id, quantity: value as number })}
        />
      </Flex>
    )
  );
}
