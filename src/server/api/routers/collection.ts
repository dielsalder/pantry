import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const collectionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), userId: z.string() }))
    .mutation(({ ctx, input: { userId, name } }) => {
      return ctx.db.collection.create({ data: { userId, name } });
    }),
  read: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.collection.findUnique({
      where: { id: input },
      include: { items: true },
    });
  }),
  delete: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.collection.delete({ where: { id: input } }),
    ),
});
