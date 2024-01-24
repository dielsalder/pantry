import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  read: protectedProcedure.query(({ ctx }) => {
    const id = ctx.session.user.id;
    return ctx.db.user.findUnique({
      where: { id },
      include: { collections: { select: { id: true } } },
    });
  }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const id = ctx.session.user.id;
    return ctx.db.user.create({
      data: {
        id,
        collections: {
          create: { name: "Pantry", items: { create: [] }, id },
        },
      },
    });
  }),
  pantry: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.collection.findUnique({ where: { id: input } }).items();
  }),
  items: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.user
      .findUnique({
        where: { id: input },
      })
      .items();
  }),
});
