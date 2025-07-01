import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Tampilkan di log untuk debugging
  console.error("Error caught by middleware:", err);

  const statusCode = err.status || 500;
  const message =
    typeof err === "string"
      ? err // jika throw "text string"
      : err.message || "Terjadi kesalahan pada server";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
