import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input: { id } }) => {
      return ctx.db.user.create({
        data: {
          id,
          collections: { create: { name: "Pantry", items: { create: [] } } },
        },
      });
    }),
});
