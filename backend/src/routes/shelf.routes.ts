import { Router } from "express";
import { createShelf,getById,getShelves } from "../controllers/shelf.controller.js";

const router = Router();

router.get("/",getShelves);
router.get("/:id",getById);
router.post("/",createShelf);

export default router