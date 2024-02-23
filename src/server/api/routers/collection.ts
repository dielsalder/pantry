import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sortByFoodGroup } from "../helpers/sortByFoodGroup";
import { sorts } from "./sort";
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
      const where = { collectionId: id };
      const include = { foodGroups: true };
      if (sort === "name") {
        return ctx.db.item.findMany({
          where,
          orderBy: { name: "asc" },
          include,
        });
      } else if (sort === "foodGroup") {
        const items = await ctx.db.item.findMany({
          where,
          include,
        });
        return sortByFoodGroup(items);
      } else if (sort === "prep") {
        return ctx.db.item.findMany({
          where,
          orderBy: { prep: "desc" },
          include,
        });
      } else if (sort === "oldestFirst") {
        return ctx.db.item.findMany({
          where,
          orderBy: { createdAt: "asc" },
          include,
        });
      } else if (sort === "newestFirst") {
        return ctx.db.item.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include,
        });
      }

      return ctx.db.item.findMany({ where, include });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.collection.delete({ where: { id: input } }),
    ),
});
