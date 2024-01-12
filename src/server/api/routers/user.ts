import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  read: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      return ctx.db.user.create({
        data: {
          id,
          pantryId: id,
          collections: {
            create: { name: "Pantry", items: { create: [] }, id },
          },
        },
      });
    }),
  pantry: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.collection.findUnique({ where: { id: input } }).items();
  }),
});
