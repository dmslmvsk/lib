import type { Request, Response } from "express";
import { ShelfService } from "../services/shelf.service.js";

export const getShelves = async (req: Request, res: Response) => {
  try {
    const shelves = await ShelfService.getAll();
    res.json(shelves);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const shelf = await ShelfService.getById(id);
    if (!shelf) {
      return res.status(404).json({ error: "Shelf not found" });
    }
    res.json(shelf);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createShelf = async (req: Request, res: Response) => {
  try {
    const { label, libraryId, genreId } = req.body;
    if (!label || !libraryId || !genreId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const shelf = await ShelfService.createShelf(label, libraryId, genreId);
    res.status(201).json(shelf);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateShelf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const { label, libraryId, genreId } = req.body;
    const updatedShelf = await ShelfService.updateShelf(id, {
      label,
      libraryId,
      genreId,
    });
    res.json(updatedShelf);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteShelf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    await ShelfService.deleteShelf(id);
    res.json({ message: "Shelf deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
