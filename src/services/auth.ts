import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken, signResetToken, verifyResetToken } from "../utils/jwt";

export async function registerUser(email: string, password: string) {
  if (!email.match(/@/) || password.length < 6) {
    throw new Error("Invalid email or password");
  }
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });
  return { id: user.id, email: user.email };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("user not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("wrong password");

  const token = signToken({ id: user.id, role: user.role });
  return { token };
}

export async function loginSupplier(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("user not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("wrong password");

  if (user.role !== "supplier") {
    throw new Error("Access denied: only suppliers can login");
  }

  const token = signToken({ id: user.id, role: user.role });
  return { token };
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const token = signResetToken(email);
  return token;
}

export async function resetPasswordUsingJWT(
  token: string,
  newPassword: string
) {
  const { email } = verifyResetToken(token);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashed },
  });

  return { message: "Password has been reset successfully" };
}

export async function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
}) {
  const product = await prisma.product.create({
    data,
  });
  return product;
}
