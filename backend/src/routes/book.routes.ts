import { Router } from "express";
import { createBook,deleteBook,getBooks,getById, updateBook } from "../controllers/book.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/",getBooks);
router.get("/:id",getById);
router.post("/",authMiddleware,adminMiddleware,createBook);
router.delete("/:id",authMiddleware,adminMiddleware,deleteBook)
router.put("/:id",authMiddleware,adminMiddleware,updateBook)
export default router;