import { Router } from "express";
import {
  createGenre,
  getById,
  getGenres,
  deleteGenre,
  updateGenre,
} from "../controllers/genre.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getGenres);
router.get("/:id", getById);
router.post("/", authMiddleware, adminMiddleware, createGenre);
router.delete("/:id", authMiddleware, adminMiddleware, deleteGenre);
router.put("/:id", authMiddleware, adminMiddleware, updateGenre);
export default router;
