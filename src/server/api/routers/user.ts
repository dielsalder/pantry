import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { randomUUID } from "crypto";

export const userRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const pantryId = randomUUID();
      return ctx.db.user.create({
        data: {
          id,
          pantryId,
          collections: {
            create: { name: "Pantry", items: { create: [] }, id: pantryId },
          },
        },
      });
    }),
});
