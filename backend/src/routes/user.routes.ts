import { Router } from "express";
import {
  getUsers,
  updateUserRole,
  deleteUser,
  getProfile,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getProfile);
router.get("/", authMiddleware, adminMiddleware, getUsers);
router.put("/:id", authMiddleware, adminMiddleware, updateUserRole);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
