import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { itemRouter } from "./routers/item";
import { collectionRouter } from "./routers/collection";
import { foodGroupRouter } from "./routers/foodGroup";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  item: itemRouter,
  collection: collectionRouter,
  foodGroup: foodGroupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
