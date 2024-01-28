import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sortByFoodGroup } from "../helpers/sortByFoodGroup";
const sorts = ["name", "foodGroup"] as const;
export type Sort = (typeof sorts)[number];
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
    });
  }),
  items: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        sort: z.optional(z.enum(sorts)),
      }),
    )
    .query(async ({ ctx, input: { id, sort } }) => {
      if (sort === "name") {
        return ctx.db.item.findMany({
          where: { collectionId: id },
          orderBy: { name: "asc" },
        });
      }
      if (sort === "foodGroup") {
        const items = await ctx.db.item.findMany({
          where: { collectionId: id },
          include: { foodGroups: true },
        });
        return sortByFoodGroup(items);
      }
      return ctx.db.collection.findUnique({ where: { id } }).items();
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.collection.delete({ where: { id: input } }),
    ),
});
