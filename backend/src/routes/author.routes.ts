import { Router } from "express";
import { createAuthor,getAuthors,getById } from "../controllers/author.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/",getAuthors);
router.get("/:id",getById);
router.post("/",authMiddleware,adminMiddleware,createAuthor);

export default router;