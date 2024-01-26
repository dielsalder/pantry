import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { randomUUID } from "crypto";

export const foodGroupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx: { session, db }, input }) => {
      return db.foodGroup.create({
        data: { id: randomUUID(), ...input, userId: session.user.id },
      });
    }),
});
