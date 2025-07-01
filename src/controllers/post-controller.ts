import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getPostByCategorie = async (req: Request, res: Response) => {
  const { sortBy, order, categoryId } = req.query;
  const filters = {
    ...(categoryId && { categoryId: parseInt(categoryId as string) }),
  };
  try {
    const posts = await prisma.post.findMany({
      where: filters,
      orderBy: sortBy
        ? {
            [sortBy as string]: order === "desc" ? "desc" : "asc",
          }
        : undefined,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to get posts" });
  }
};

export const getCommentLimit = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id); // id = postId
  const { sortBy = "id", order = "asc", limit, offset } = req.query;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: {
        [sortBy as string]: order === "desc" ? "desc" : "asc",
      },
      take: limit ? parseInt(limit as string) : undefined,
      skip: offset ? parseInt(offset as string) : undefined,
      include: {
        post: {
          select: {
            title: true,
          },
        },
      },
    });

    const total = await prisma.comment.count({
      where: { postId },
    });

    res.status(200).json({ data: comments, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to get comments" });
  }
};

export const getCommentSummary = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id); // id = postId
  const { sortBy = "id", order = "asc", limit, offset } = req.query;

  try {
    const stats = await prisma.comment.groupBy({
      by: ["postId"],
      _count: { id: true },
    });

    const result = await Promise.all(
      stats.map(async (item) => {
        const post = await prisma.post.findUnique({
          where: { id: item.postId },
          select: { title: true },
        });

        return {
          postId: item.postId,
          title: post?.title ?? "Tidak diketahui",
          jumlahKomentar: item._count.id,
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Gagal ambil statistik komentar:", error);
    res.status(500).json({ error: "Gagal ambil data" });
  }
};

// export const getGroupedOrders = async (req: Request, res: Response) => {
//   try {
//     // Group orders by userId
//     const groupedOrders = await prisma.order.groupBy({
//       by: ["userId"],
//       _count: { id: true },
//       _sum: { quantity: true },
//     });

//     // Fetch user names for each group
//     const result = await Promise.all(
//       groupedOrders.map(async (item) => {
//         const user = await prisma.user.findUnique({
//           where: { id: item.userId },
//           select: { name: true },
//         });

//         return {
//           userId: item.userId,
//           name: user?.name ?? "Unknown",
//           jumlah_order: item._count.id,
//           total_quantity: item._sum.quantity ?? 0,
//         };
//       })
//     );

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error grouping orders:", error);
//     res.status(500).json({ error: "Failed to group orders" });
//   }
// };
