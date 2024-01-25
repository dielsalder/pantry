import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const itemSchema = z.object({
  name: z.optional(z.string()),
  id: z.number(),
  quantity: z.optional(z.nullable(z.number())),
  unit: z.optional(z.nullable(z.string())),
  collectionId: z.optional(z.string()),
});

export const itemRouter = createTRPCRouter({
  read: protectedProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.item.findUnique({ where: { id: input } }),
    ),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.nullable(z.number()),
        unit: z.nullable(z.string()),
        collectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.item.create({ data: { ...input, userId } });
    }),
  update: protectedProcedure
    .input(itemSchema)
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.item.findUnique({ where: { id: input.id } });
      const data = { ...item, ...input };
      return ctx.db.item.update({ where: { id: input.id }, data });
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.db.item.delete({ where: { id: input } })),
});
