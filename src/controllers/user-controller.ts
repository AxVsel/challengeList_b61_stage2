import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getUserByPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "user tidak ditemukan" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch datas" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch datas" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "failed to create user" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({ message: "user berhasil diedit" });
  } catch (error) {
    res.status(500).json({ error: "user tidak ada" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.deleteMany({
      where: { authorId: id },
    });
    await prisma.user.delete({
      where: { id },
    });
    res
      .status(201)
      .json({ message: "user dan semua post terhapus berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "failed to create user" });
  }
};
