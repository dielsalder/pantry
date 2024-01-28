export const sorts = [
  "name",
  "foodGroup",
  "oldestFirst",
  "newestFirst",
] as const;
export type Sort = (typeof sorts)[number];
