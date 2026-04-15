import { Router } from "express";
import { createLibrary,getLibraries } from "../controllers/library.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/",getLibraries)
router.post("/",authMiddleware,adminMiddleware,createLibrary)

export default router;