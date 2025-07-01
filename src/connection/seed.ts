import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();

  await prisma.supplier.create({
    data: {
      name: "PT Sumber Makmur",
      email: "sumbermakmur@example.com",
      phone: "08123456789",
    },
  });
  await prisma.supplier.create({
    data: {
      name: "CV Jaya Abadi",
      email: "jayaabadi@example.com",
      phone: "08234567890",
    },
  });

  // Buat produk dan stoknya
  await prisma.product.create({
    data: {
      name: "Sabun Mandi Herbal",
      description: "Sabun mandi dari bahan alami",
      price: 15000,
      supplierId: 1,
      stock: {
        create: {
          quantity: 100,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Shampoo Organik",
      description: "Shampoo untuk rambut rontok",
      price: 25000,
      supplierId: 2,
      stock: {
        create: {
          quantity: 50,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Pasta Gigi Charcoal",
      description: "Membersihkan dan memutihkan gigi",
      price: 20000,
      supplierId: 2,
      stock: {
        create: {
          quantity: 80,
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log("seeding completed ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
