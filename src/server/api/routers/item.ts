import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.nullable(z.number()),
        unit: z.nullable(z.string()),
        collectionId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.item.create({ data: { ...input } });
    }),
  update: publicProcedure
    .input(
      z.object({
        name: z.optional(z.string()),
        id: z.number(),
        quantity: z.optional(z.nullable(z.number())),
        unit: z.optional(z.nullable(z.string())),
        collectionId: z.optional(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.item.findUnique({ where: { id: input.id } });
      const data = { ...input, ...item };
      return ctx.db.item.update({ where: { id: input.id }, data });
    }),
  delete: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.db.item.delete({ where: { id: input } })),
});
