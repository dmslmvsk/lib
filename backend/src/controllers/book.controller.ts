import type { Request,Response } from "express";
import { BookService } from "./book.service.js";

export const getBooks = async (req:Request, res:Response) => {
	try{
		const books = await BookService.getAll();
		res.json(books)
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
		const book = await BookService.getById(id);
		if(!book){
			return res.status(404).json({error:"Book not found"})
		}
		res.json(book)

	} catch (err){
		res.status(500).json({error:"Internal server error"})
	}
}

export const createBook = async(req:Request, res:Response) => {
	try{
		const {title,authorId,shelfId,genreId} = req.body
		if(!title || !authorId || !shelfId || !genreId){
			return res.status(400).json({error:"All fields are required"})
		}
		const book = await BookService.createBook(title, authorId, genreId, shelfId);
		res.status(201).json(book)
	}
	catch(err:any){
		res.status(400).json({error:err.message})
	}
}