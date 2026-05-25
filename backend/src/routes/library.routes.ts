import { Router } from "express";
import {
  createLibrary,
  deleteLibrary,
  getLibraries,
  updateLibrary,
} from "../controllers/library.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getLibraries);
router.post("/", authMiddleware, adminMiddleware, createLibrary);
router.delete("/:id", authMiddleware, adminMiddleware, deleteLibrary);
router.put("/:id", authMiddleware, adminMiddleware, updateLibrary);
export default router;
