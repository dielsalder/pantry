export const sorts = [
  "name",
  "prep",
  "foodGroup",
  "oldestFirst",
  "newestFirst",
] as const;
export type Sort = (typeof sorts)[number];
