import { db } from "../src/server/db";

async function main() {
  await db.user.upsert({
    where: { id: "lazarus" },
    update: {},

    create: {
      id: "lazarus",
      pantryId: "lazarus",
      collections: {
        create: {
          id: "lazarus",
          name: "Pantry",
          items: {
            create: [
              {
                name: "eggs",
                quantity: 0,
              },
              {
                name: "milk",
                quantity: 1,
              },
            ],
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
