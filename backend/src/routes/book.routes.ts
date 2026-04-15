import { Router } from "express";
import { createBook,getBooks,getById } from "../controllers/book.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/",getBooks);
router.get("/:id",getById);
router.post("/",authMiddleware,adminMiddleware,createBook);

export default router;