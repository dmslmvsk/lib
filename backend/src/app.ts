import express from "express"
import type { Application, Request, Response } from 'express';
import cors from "cors"
import authorRoutes from "./routes/author.routes.js"
import libraryRoutes from "./routes/library.routes.js"
import genreRoutes from "./routes/genre.routes.js"
import bookRoutes from "./routes/book.routes.js"
import shelfRoutes from "./routes/shelf.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js";
import statsRoutes from "./routes/stats.routes.js";
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.get("/health",(req:Request, res: Response) => {
	res.status(200).json({status: "ok", message:"Library API is working"})
})

const apiRouter = express.Router();

apiRouter.use("/authors", authorRoutes);
apiRouter.use("/libraries", libraryRoutes);
apiRouter.use("/genres", genreRoutes);
apiRouter.use("/books", bookRoutes);
apiRouter.use("/shelves", shelfRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/users",userRoutes);
apiRouter.use("/stats",statsRoutes)
app.use("/api", apiRouter);

export default app