import { Router } from "express";
import { createBook,getBooks,getById } from "../controllers/book.controller.js";

const router = Router();

router.get("/",getBooks);
router.get("/:id",getById);
router.post("/",createBook);

export default router;