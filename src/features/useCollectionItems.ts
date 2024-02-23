import { useAtomValue } from "jotai";
import { api } from "~/utils/api";
import {
  selectedFoodGroupsAtom,
  prepAtom,
  perishableAtom,
} from "./home/filterAtoms";
import { sortAtom } from "./home/sortAtom";

export function useCollectionItems(id: string) {
  const sort = useAtomValue(sortAtom);
  const selectedFoodGroups = useAtomValue(selectedFoodGroupsAtom);
  const selectedPrep = useAtomValue(prepAtom);
  const perishableOnly = useAtomValue(perishableAtom);
  return api.collection.items.useQuery(
    {
      id,
      sort,
      perishableOnly,
    },
    {
      keepPreviousData: true,
      select: (data) => {
        let filteredData = data;
        if (selectedFoodGroups.length) {
          filteredData = data.filter((item) => {
            for (const foodGroup of item.foodGroups) {
              if (selectedFoodGroups.includes(foodGroup?.id)) return true;
            }
            return false;
          });
        }
        if (selectedPrep.length) {
          filteredData = data.filter((item) => {
            return item.prep && selectedPrep.includes(item.prep);
          });
        }
        return filteredData;
      },
    },
  );
}
