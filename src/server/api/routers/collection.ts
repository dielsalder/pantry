import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
export const collectionRouter = createTRPCRouter({
  create: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.collection.create({
      data: { userId: ctx.session?.user.id, name: input },
    });
  }),
  read: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.collection.findUnique({
      where: { id: input },
      include: { items: true },
    });
  }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.collection.delete({ where: { id: input } }),
    ),
});
