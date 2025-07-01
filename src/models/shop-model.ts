export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

export const products: Product[] = [
  { id: 1, name: "Laptop", price: 15000000, stock: 10 },
  { id: 2, name: "Mouse", price: 150000, stock: 50 },
  { id: 3, name: "Keyboard", price: 300000, stock: 30 },
];

export const orders: Order[] = [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ],
    total: 15000000 + 150000 * 2,
    createdAt: new Date("2025-06-20T10:00:00"),
  },
  {
    id: 2,
    items: [{ productId: 3, quantity: 1 }],
    total: 300000,
    createdAt: new Date("2025-06-22T14:30:00"),
  },
];
