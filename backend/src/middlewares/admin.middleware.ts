import type { AuthRequest } from "./auth.middleware.js";
import type { NextFunction,Response } from "express";
export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ error: "Access denied. Admins only." });
    return;
  }
  next();
};