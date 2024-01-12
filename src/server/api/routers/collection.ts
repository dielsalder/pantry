import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const collectionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), userId: z.string() }))
    .mutation(({ ctx, input: { userId, name } }) => {
      return ctx.db.collection.create({ data: { userId, name } });
    }),
  get: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      ctx.db.collection.findUnique({ where: { id: input } }),
    ),
  delete: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.collection.delete({ where: { id: input } }),
    ),
});
