import { Request, Response } from "express";
import {
  products,
  Product,
  orders,
  Order,
  OrderItem,
} from "../models/shop-model";

export const getProduct = (req: Request, res: Response) => {
  res.json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price, stock } = req.body;

  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
    stock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const deleteProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((post) => post.id === productId);

  if (index !== -1) {
    const deleteProduct = products.splice(index, 1)[0];
    res.status(200).json({ message: "Post deleted", product: deleteProduct });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};

export const editProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const { name, price, stock } = req.body;

  const index = products.findIndex((post) => post.id === productId);

  if (index === -1) {
    res.status(404).json({ message: "Post not found" });
  }
  products[index].name = name ?? products[index].name;
  products[index].price = price ?? products[index].price;
  products[index].stock = stock ?? stock[index].stock;
  res.status(200).json({ message: "Post updated", post: products[index] });
};

export const getOrder = (req: Request, res: Response) => {
  res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
  const items: OrderItem[] = req.body.items;

  if (items && items.length > 0) {
    let total = 0;
    let valid = true;
    let errorMessage = "";
    let errorStatus = 400;

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        valid = false;
        errorMessage = `Product with ID ${item.productId} not found`;
        errorStatus = 404;
        break;
      }
      if (product.stock < item.quantity) {
        valid = false;
        errorMessage = `Insufficient stock for product ${product.name}`;
        break;
      }
      total += product.price * item.quantity;
    }

    if (valid) {
      for (const item of items) {
        const product = products.find((p) => p.id === item.productId);
        if (product) {
          product.stock -= item.quantity;
        }
      }

      const newOrder: Order = {
        id: orders.length + 1,
        items,
        total,
        createdAt: new Date(),
      };

      orders.push(newOrder);
      res.status(201).json({ message: "Order created", order: newOrder });
    } else {
      res.status(errorStatus).json({ message: errorMessage });
    }
  } else {
    res.status(400).json({ message: "Order items required" });
  }
};

export const deleteOrder = (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);

  const index = orders.findIndex((o) => o.id === orderId);

  if (index !== -1) {
    for (const item of orders[index].items) {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        product.stock += item.quantity;
      }
    }
    const deletedOrder = orders.splice(index, 1)[0];

    res.status(200).json({ message: "Order deleted", order: deletedOrder });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};
