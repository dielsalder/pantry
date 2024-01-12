import { db } from "../src/server/db";

async function main() {
  await db.user.upsert({
    where: { name: "lazarus", id: undefined },
    update: {},

    create: {
      name: "lazarus",
      collections: {
        create: {
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
