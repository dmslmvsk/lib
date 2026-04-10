import { Router } from "express";
import { createAuthor,getAuthors,getById } from "../controllers/author.controller.js";

const router = Router();

router.get("/",getAuthors);
router.get("/:id",getById);
router.post("/",createAuthor);

export default router;