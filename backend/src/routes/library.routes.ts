import { Router } from "express";
import { createLibrary,getLibraries } from "../controllers/library.controller.js";

const router = Router();

router.get("/",getLibraries)
router.post("/",createLibrary)

export default router;