import { Router } from "express";
import { getAdminStats } from "../controllers/stats.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const statsRoutes = Router();
statsRoutes.get("/", authMiddleware, adminMiddleware, getAdminStats);
export default statsRoutes;