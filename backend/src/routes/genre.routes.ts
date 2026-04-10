import { Router } from "express";
import { createGenre,getById,getGenres } from "../controllers/genre.controller.js";

const router = Router();

router.get("/",getGenres);
router.get("/:id",getById);
router.post("/",createGenre);

export default router;