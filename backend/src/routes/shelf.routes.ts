import { Router } from "express";
import { createShelf,getById,getShelves } from "../controllers/shelf.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/",getShelves);
router.get("/:id",getById);
router.post("/",authMiddleware,adminMiddleware,createShelf);

export default router