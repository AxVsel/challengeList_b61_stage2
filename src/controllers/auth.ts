import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPasswordUsingJWT,
  loginSupplier,
  createProduct,
} from "../services/auth";
import { loginSchema, registerSchema } from "../validation/auth";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.json({ message: "Login success", ...result });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function handleSupplier(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const result = await loginSupplier(email, password);
    res.json({ message: "Login success", ...result });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function handlePasswordResetRequest(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const token = await requestPasswordReset(email);
    res.json({ message: "Reset token generated", token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function handleResetPasswordSubmit(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;
    const result = await resetPasswordUsingJWT(token, newPassword);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function handleCreateProduct(req: Request, res: Response) {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !price || stock === undefined) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const product = await createProduct({ name, description, price, stock });
    res.status(201).json({ message: "Product created", product });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
