import { Router } from "express";
import { getUsers, updateUserRole, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRoutes = Router();


userRoutes.get("/", authMiddleware,adminMiddleware, getUsers);
userRoutes.put("/:id", authMiddleware,adminMiddleware, updateUserRole);
userRoutes.delete("/:id", authMiddleware,adminMiddleware, deleteUser);