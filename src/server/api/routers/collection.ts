import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
export const collectionRouter = createTRPCRouter({
  create: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.collection.create({
      data: { userId: ctx.session?.user.id, name: input },
    });
  }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.collection.update({
        where: { id: input.id },
        data: input,
      });
    }),
  read: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.collection.findUnique({
      where: { id: input },
      include: {
        items: { include: { foodGroups: { orderBy: { name: "asc" } } } },
      },
    });
  }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.collection.delete({ where: { id: input } }),
    ),
});
