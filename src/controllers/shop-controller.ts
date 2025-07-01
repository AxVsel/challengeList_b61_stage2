import { Request, Response, NextFunction } from "express";
import { prisma } from "../connection/client";

export const updateItemWithSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    productId,
    stockId,
    supplierId,
    productName,
    description,
    price,
    quantity,
    supplierName,
    email,
    phone,
  } = req.body;

  try {
    const [product, stock, supplier] = await Promise.all([
      prisma.product.findUnique({ where: { id: productId } }),
      prisma.stock.findUnique({ where: { id: stockId } }),
      prisma.supplier.findUnique({ where: { id: supplierId } }),
    ]);

    if (quantity < 0 || price < 0) {
      throw { status: 400, message: "Quantity dan price tidak boleh negatif" };
    }

    if (!product) {
      throw { status: 404, message: "product tidak ditemukan" };
    }
    if (!stock) {
      throw { status: 404, message: "stock tidak ditemukan" };
    }
    if (!supplier) {
      throw { status: 404, message: "Supplier tidak ditemukan" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.stock.update({
        where: { id: stockId },
        data: {
          quantity,
        },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          name: productName,
          description,
          price,
          supplierId,
        },
      });

      await tx.supplier.update({
        where: { id: supplierId },
        data: {
          name: supplierName,
          email,
          phone,
        },
      });
    });

    res.json({ message: "Barang berhasil diperbarui" });
    return;
  } catch (error) {
    next(error);
  }
};
