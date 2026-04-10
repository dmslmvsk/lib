import type { Request,Response } from "express";
import { GenreService } from "../services/genre.service.js";

export const getGenres = async (req:Request, res:Response) => {
	try{
		const genres = await GenreService.getAll();
		res.json(genres)
	}
	catch(err){
		res.status(500).json({error:"Internal server error"})
	}
}

export const createGenre = async (req:Request, res:Response) => {
	try{
		const {name} = req.body
		if (!name){
			return res.status(400).json({ error: "Name is required" });
		}
		const genre = await GenreService.createGenre(name);
		res.status(201).json(genre)
	}
	catch(err:any){
		res.status(400).json({error: err.message})
	}
}

export const getById = async(req:Request, res:Response) => {
	try {
		const {id} = req.params
		if (typeof id !== 'string') {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
		const genre = await GenreService.getById(id);
		if(!genre) {
			return res.status(400).json({ error: "Genre not found" })
		}
		
		res.json(genre)
	}
	catch(err){
		res.status(400).json({error:"Genre not found"})
	}
}