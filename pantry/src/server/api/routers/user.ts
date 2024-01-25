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
  items: protectedProcedure.query(
    async ({
      ctx: {
        db,
        session: {
          user: { id },
        },
      },
    }) => {
      return db.user
        .findUnique({
          where: { id },
        })
        .items();
    },
  ),
});
