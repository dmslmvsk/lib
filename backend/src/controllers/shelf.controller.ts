import type { Request,Response } from "express";
import { ShelfService } from "../services/shelf.service.js";
import { error } from "node:console";

export const getShelves = async (req:Request, res:Response) => {
	try{
		const shelves = await ShelfService.getAll();
		res.json(shelves)
	}
	catch(err){	
		res.status(500).json({error:"Internal server error"})
	}
}

export const getById = async (req:Request, res:Response) => {
	try{
		const {id} = req.params
		if(typeof id !== "string"){
			return res.status(400).json({error:"Invalid ID provided"})
		}
		const shelf = await ShelfService.getById(id);
		if(!shelf){
			return res.status(400).json({error:"Shelfe not found"})
		}
		res.json(shelf);
	}
	catch(err){
		res.status(500).json({error:"Internal server error"})
	}
}

export const createShelf = async (req:Request, res:Response) => {
	const {label,libraryId,genreId} = req.body
	if(!label || !libraryId || !genreId){
		return res.status(400).json({error:"All fields are required"})
	}
	try{
		const shelf = await ShelfService.createShelfe(label,libraryId,genreId);
		res.status(201).json(shelf)
	}
	catch(err:any){
		res.status(400).json({error:err.message})
	}

}