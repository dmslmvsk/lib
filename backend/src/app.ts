import express from "express"
import type { Application, Request, Response } from 'express';
import cors from "cors"
import authorRoutes from "./routes/author.routes.js"
import libraryRoutes from "./routes/library.routes.js"
import genreRoutes from "./routes/genre.routes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health",(req:Request, res: Response) => {
	res.status(200).json({status: "ok", message:"Library API is working"})
})

app.use("/authors",authorRoutes);
app.use("/libraries",libraryRoutes);
app.use("/genres",genreRoutes);

export default app