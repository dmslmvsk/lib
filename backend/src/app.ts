import express from "express"
import type { Application, Request, Response } from 'express';
import cors from "cors"
import authorRoutes from "./routes/author.routes.js"
import libraryRoutes from "./routes/library.routes.js"
import genreRoutes from "./routes/genre.routes.js"
import bookRoutes from "./routes/book.routes.js"
import shelfRoutes from "./routes/shelf.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health",(req:Request, res: Response) => {
	res.status(200).json({status: "ok", message:"Library API is working"})
})

app.use("/authors",authorRoutes);
app.use("/libraries",libraryRoutes);
app.use("/genres",genreRoutes);
app.use("/books",bookRoutes);
app.use("/shelves",shelfRoutes);
app.use("/auth",authRoutes)
export default app