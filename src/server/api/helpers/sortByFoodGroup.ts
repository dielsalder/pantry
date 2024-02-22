import { type Prisma } from "@prisma/client";

type ItemSortable = Prisma.ItemGetPayload<{ include: { foodGroups: true } }>;
function compareItems(a: ItemSortable, b: ItemSortable): number {
  const sortedFoodGroupArrs = [a, b].map((item) => item.foodGroups.sort());
  console.log(sortedFoodGroupArrs);
  const [hashA, hashB] = sortedFoodGroupArrs.map((foodGroups) =>
    foodGroups.map(({ id }) => id).join(),
  );
  return (hashA ?? "").localeCompare(hashB ?? "");
}
export function sortByFoodGroup(items: ItemSortable[]): ItemSortable[] {
  return items.sort(compareItems);
}
