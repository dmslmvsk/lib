import type { Request, Response } from "express";
import { LibraryService } from "../services/library.service.js";

export const getLibraries = async (req:Request, res:Response) => {
	try{
		const libraries = await LibraryService.getAll();
		res.json(libraries)
	}
	catch(err){
		res.status(500).json({error:"Internal server error"})
	}
};

export const createLibrary = async (req:Request, res:Response) => {
	try{
		const {name} = req.body;
		if (!name) {
			return res.status(400).json({ error: "Name is required" });
		
		}
		const library = await LibraryService.create(name);
		res.json(library)
	}
	catch(err){
		res.status(500).json({error:"Internal server error"})
		}
	};