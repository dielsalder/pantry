import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const itemSchema = z.object({
  name: z.optional(z.string()),
  id: z.number(),
  quantity: z.optional(z.nullable(z.number())),
  unit: z.optional(z.nullable(z.string())),
  collectionId: z.optional(z.string()),
});

export const itemRouter = createTRPCRouter({
  read: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.item.findUnique({ where: { id: input } }),
    ),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.nullable(z.number()),
        unit: z.nullable(z.string()),
        collectionId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.item.create({ data: { ...input } });
    }),
  update: publicProcedure.input(itemSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.db.item.findUnique({ where: { id: input.id } });
    const data = { ...item, ...input };
    return ctx.db.item.update({ where: { id: input.id }, data });
  }),
  delete: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.db.item.delete({ where: { id: input } })),
});
