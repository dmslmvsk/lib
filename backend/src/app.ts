import express from "express"
import type { Application, Request, Response } from 'express';
import cors from "cors"

const app : Application = express();

app.use(express.json());
app.use(cors());

app.get("/health",(req:Request, res: Response) => {
	res.status(200).json({status: "ok", message:"Library API is working"})
})

export default app