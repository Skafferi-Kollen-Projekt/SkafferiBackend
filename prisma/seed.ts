import { prisma } from "../src/config/db";

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Dairy & Eggs", icon: "🥛" },
      { name: "Meat & Fish", icon: "🥩" },
      { name: "Fruits", icon: "🍎" },
      { name: "Vegetables", icon: "🥕" },
      { name: "Dry Goods", icon: "🧂" },
      { name: "Frozen", icon: "❄️" },
      { name: "Snacks & Sweets", icon: "🍪" },
    ],
    skipDuplicates: true,
  });
  console.log("✅, Categories seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
