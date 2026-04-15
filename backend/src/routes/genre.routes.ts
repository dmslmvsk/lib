import { Router } from "express";
import { createGenre,getById,getGenres } from "../controllers/genre.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/",getGenres);
router.get("/:id",getById);
router.post("/",authMiddleware,adminMiddleware,createGenre);

export default router;