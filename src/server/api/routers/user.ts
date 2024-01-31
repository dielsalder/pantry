import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { itemsTableSorts } from "./itemsTableSorts";
import { sortByFoodGroup } from "../helpers/sortByFoodGroup";
const sortDirection = z.enum(["asc", "desc"]);
export const userRouter = createTRPCRouter({
  collections: protectedProcedure.query(({ ctx }) => {
    const id = ctx.session.user.id;
    return ctx.db.collection.findMany({
      where: { userId: id },
      select: { id: true },
    });
  }),
  foodGroups: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user
      .findUnique({
        where: { id: ctx.session.user.id },
      })
      .foodGroups();
  }),
  items: protectedProcedure
    .input(
      z.optional(
        z.object({
          sort: z.optional(
            z.object({
              by: z.enum(itemsTableSorts),
              direction: sortDirection,
            }),
          ),
        }),
      ),
    )
    .query(
      async ({
        ctx: {
          db,
          session: {
            user: { id },
          },
        },
        input,
      }) => {
        let orderBy = {};
        const include = {
          foodGroups: true,
          collection: { select: { name: true, id: true } },
        };
        const where = { userId: id };
        if (input?.sort) {
          const {
            sort: { direction, by },
          } = input;
          if (by === "foodGroups") {
            const items = await db.item.findMany({ where, include });
            const sorted = sortByFoodGroup(items);
            return direction === "asc" ? sorted : sorted.reverse();
          } else if (by === "collection") {
            orderBy = { collection: { name: direction } };
          } else {
            orderBy = { [by]: direction };
          }
        }
        return db.item.findMany({ where, orderBy, include });
      },
    ),
});
