import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  read: protectedProcedure.query(({ ctx }) => {
    const id = ctx.session.user.id;
    return ctx.db.user.findUnique({
      where: { id },
      include: { collections: { select: { id: true } } },
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
