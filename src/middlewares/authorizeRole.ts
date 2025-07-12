// middleware/authenticateAdminOnly.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { UserPayLoad } from "../utils/jwt";

export function authenticateAdminOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token) as UserPayLoad;

    if (user.role !== "admin") {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }
    (req as any).user = user as any; // jika perlu digunakan di controller
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
}
