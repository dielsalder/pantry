import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { randomUUID } from "crypto";
import { FoodGroupIconType } from "@prisma/client";
export const foodGroupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        icon: z.nativeEnum(FoodGroupIconType),
        color: z.string(),
      }),
    )
    .mutation(({ ctx: { session, db }, input }) => {
      return db.foodGroup.create({
        data: { id: randomUUID(), ...input, userId: session.user.id },
      });
    }),
  read: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      ctx.db.foodGroup.findUnique({ where: { id: input } }),
    ),
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.foodGroup.delete({ where: { id: input } }),
    ),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.optional(z.string()),
        icon: z.optional(z.nativeEnum(FoodGroupIconType)),
        color: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const previousData = await ctx.db.foodGroup.findUnique({
        where: { id: input.id },
      });
      return ctx.db.foodGroup.update({
        where: { id: input.id },
        data: { ...previousData, ...input },
      });
    }),
});
