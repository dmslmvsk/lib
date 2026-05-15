import type { Request, Response } from "express";
import { AuthorService } from "../services/author.service.js";

export const getAuthors = async (req:Request, res:Response) => {
	try{
		const authors = await AuthorService.getAll();
		res.json(authors)
	}
	catch(err){
		res.status(500).json({error:"Internal server error"})
	}
}

export const getById = async (req:Request, res:Response) => {
	try{
		const {id} = req.params
		if (typeof id !== 'string') {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
		const author = await AuthorService.getById(id);
		if(!author) {
			return res.status(404).json({ error: "Author not found" })
		}
		
		res.json(author)
	}
	catch(err){
		res.status(400).json({error:"Author not found"})
	}
}

export const createAuthor = async (req:Request, res:Response) => {
	try{
		const {name} = req.body;
		if (!name) {
			return res.status(400).json({ error: "Name is required" });
		}
		const author = await AuthorService.createAuthor(name);
		res.status(201).json(author)
	}
	catch(err : any){
		res.status(400).json({ error: err.message });
	}
}

export const deleteAuthor = async (req:Request, res:Response) => {
	try{
		const {id} = req.params


		if (typeof id !== 'string') {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

		await AuthorService.deleteAuthor(id)

		res.status(200).json({ success: true, message: "Author deleted successfully" });
	} catch (err:any) {
		if (err.code === 'P2025') {
      return res.status(404).json({ error: "Author not found" });
    }

		res.status(500).json({ error: "Failed to delete author" });
	}
}

export const updateAuthor = async (req:Request, res:Response) => {
	try{
		const {id} = req.params
		const {name} = req.body

		if (typeof id !== 'string') {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: "Name is required" });
    }

		const updateAuthor = await AuthorService.updateAuthor(id,name)
		res.status(200).json(updateAuthor)
	} catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Author not found" });
    }
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "GAuthor with this name already exists" });
    }
    res.status(500).json({ error: "Failed to update author" });
  }
}