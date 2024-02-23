export const sorts = [
  "name",
  "prep",
  "foodGroup",
  "perishable",
  "oldestFirst",
  "newestFirst",
] as const;
export type Sort = (typeof sorts)[number];
