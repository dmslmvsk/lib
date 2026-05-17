import type { Request, Response } from "express";
import { BookService } from "../services/book.service.js";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { search, genreId } = req.query;

    const books = await BookService.getAll({
      search: search as string,
      genreId: genreId as string,
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch archive records" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const book = await BookService.getById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, authorId, shelfId, genreId } = req.body;
    if (!title || !authorId || !shelfId || !genreId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const book = await BookService.createBook(title, authorId, genreId, shelfId);
    res.status(201).json(book);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};



export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, authorId, shelfId, genreId, description } = req.body;
		if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const updatedBook = await BookService.updateBook(id, {
      title,
      authorId,
      shelfId,
      genreId,
      description
    });

    res.json(updatedBook);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
		if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    await BookService.deleteBook(id);
    
    res.json({ message: "Book deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};


export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found in request" });
    }
    const userId = req.user.userId; 
    const updatedBook = await BookService.borrowBook(id, userId);
    
    res.json({
      message: "Book successfully borrowed",
      book: updatedBook
    });
  } catch (err: any) {
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ error: "Book record not found in archive" });
    }
    if (err.message === "BOOK_ALREADY_BORROWED") {
      return res.status(400).json({ error: "This item is currently unavailable" });
    }
    res.status(500).json({ error: "Internal server error during borrowing process" });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
    }

    const { userId, role } = req.user;

    const result = await BookService.returnBook(id, userId, role);
    
    res.json({
      message: "Success: Item returned to library",
      book: result
    });

  } catch (err: any) {
    switch (err.message) {
      case "BOOK_NOT_FOUND":
        return res.status(404).json({ error: "Record not found" });
      case "BOOK_NOT_BORROWED":
        return res.status(400).json({ error: "Item is already in the library" });
      case "FORBIDDEN_RETURN":
        return res.status(403).json({ error: "You don't have permission to return this item" });
      default:
        res.status(500).json({ error: "Internal server error during return process" });
    }
  }
};