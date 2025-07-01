import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.categorie.deleteMany();

  await prisma.categorie.createMany({
    data: [{ name: "Tech" }, { name: "Lifestyle" }],
  });
  await prisma.post.createMany({
    data: [
      {
        title: "Belajar Prisma ORM",
        content: "Ini adalah panduan lengkap untuk Prisma.",
        categoryId: 1,
      },
      {
        title: "Tips Menjaga Produktivitas",
        content: "Mulai dari manajemen waktu hingga teknik fokus.",
        categoryId: 2,
      },
      {
        title: "Mengenal REST API",
        content: "Pelajari konsep dasar dan implementasi RESTful API.",
        categoryId: 1,
      },
      {
        title: "Cara Mengatur Keuangan Pribadi",
        content: "Gunakan metode 50/30/20 untuk mengatur pengeluaran.",
        categoryId: 2,
      },
      {
        title: "Dasar-dasar TypeScript",
        content: "TypeScript membuat JavaScript lebih aman dan terstruktur.",
        categoryId: 1,
      },
      {
        title: "Pentingnya Tidur Berkualitas",
        content: "Tidur cukup meningkatkan konsentrasi dan imun tubuh.",
        categoryId: 2,
      },
      {
        title: "Membuat CRUD App dengan Express.js",
        content: "Langkah demi langkah membangun aplikasi dengan Express.",
        categoryId: 1,
      },
      {
        title: "Kebiasaan Pagi yang Positif",
        content:
          "Bangun pagi, journaling, dan olahraga ringan sangat disarankan.",
        categoryId: 2,
      },
      {
        title: "Optimasi Query Database",
        content: "Gunakan index dan hindari N+1 problem untuk performa.",
        categoryId: 1,
      },
      {
        title: "Mengelola Stres di Dunia Kerja",
        content:
          "Kenali pemicu stres dan cara menghadapinya dengan mindfulness.",
        categoryId: 2,
      },
      {
        title: "Pengantar GraphQL untuk Pemula",
        content: "GraphQL adalah alternatif modern dari REST API.",
        categoryId: 1,
      },
      {
        title: "Manfaat Digital Detox",
        content: "Kurangi screen time untuk menjaga kesehatan mental.",
        categoryId: 2,
      },
    ],
  });
  await prisma.comment.createMany({
    data: [
      { content: "Artikel ini sangat membantu!", postId: 1 },
      { content: "Saya suka penjelasannya.", postId: 2 },
      { content: "Tolong bahas lebih lanjut bagian Prisma Client.", postId: 1 },
      { content: "Tips ini beneran ngaruh banget, terima kasih!", postId: 2 },
      { content: "Penjelasannya singkat dan padat.", postId: 3 },
      { content: "Saya sudah coba dan berhasil, mantap!", postId: 3 },
      { content: "Suka gaya tulisannya, enak dibaca.", postId: 4 },
      { content: "Tolong buat versi videonya juga!", postId: 5 },
      { content: "Insightful banget. Worth reading!", postId: 6 },
      { content: "Jadi tahu cara debug query, makasih!", postId: 9 },
      { content: "Tulisan ini cocok buat pemula. Good job!", postId: 11 },
      { content: "Digital detox ternyata penting ya 😅", postId: 12 },
    ],
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
