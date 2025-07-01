import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch datas" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "author tidak ada " });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    res.status(201).json({ message: "post berhasil diedit" });
  } catch (error) {
    res.status(500).json({ error: "failed to create product" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.delete({
      where: { id },
    });
    res.status(201).json({ message: "post berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "failed to delete user" });
  }
};
