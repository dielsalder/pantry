import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const itemSchema = z.object({
  name: z.optional(z.string()),
  id: z.number(),
  quantity: z.optional(z.nullable(z.number())),
  unit: z.optional(z.nullable(z.string())),
  collectionId: z.optional(z.string()),
  foodGroups: z.optional(z.array(z.string())),
});

export const itemRouter = createTRPCRouter({
  read: protectedProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.item.findUnique({
        where: { id: input },
        include: { foodGroups: true },
      }),
    ),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.nullable(z.number()),
        unit: z.nullable(z.string()),
        collectionId: z.string(),
        foodGroups: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.item.create({
        data: {
          ...input,
          foodGroups: { connect: input.foodGroups?.map((id) => ({ id })) },
          userId,
        },
        include: { foodGroups: true },
      });
    }),
  update: protectedProcedure
    .input(itemSchema)
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.item.findUnique({ where: { id: input.id } });
      const data = {
        ...item,
        ...input,
        foodGroups: { connect: input.foodGroups?.map((id) => ({ id })) },
      };
      return ctx.db.item.update({
        where: { id: input.id },
        data,
        include: { foodGroups: true },
      });
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.db.item.delete({ where: { id: input } })),
});
