export const itemsTableSorts = [
  "name",
  "createdAt",
  "collection",
  "foodGroups",
  "quantity",
  "unit",
  "id",
] as const;

export type ItemsTableSort = (typeof itemsTableSorts)[number];
