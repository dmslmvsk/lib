import type { Request, Response } from "express";
import { LibraryService } from "../services/library.service.js";

export const getLibraries = async (req: Request, res: Response) => {
  try {
    const libraries = await LibraryService.getAll();
    res.json(libraries);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const library = await LibraryService.getById(id);
    if (!library) {
      return res.status(404).json({ error: "Library not found" });
    }
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createLibrary = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const library = await LibraryService.createLibrary(name);
    res.status(201).json(library);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateLibrary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const { name } = req.body;
    const updatedLibrary = await LibraryService.updateLibrary(id, { name });
    res.json(updatedLibrary);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLibrary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    await LibraryService.deleteLibrary(id);
    res.json({ message: "Library deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
