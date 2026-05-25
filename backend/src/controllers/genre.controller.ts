import type { Request, Response } from "express";
import { GenreService } from "../services/genre.service.js";

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await GenreService.getAll();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const genre = await GenreService.createGenre(name);
    res.status(201).json(genre);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const updatedGenre = await GenreService.updateGenre(id, name);
    res.status(200).json(updatedGenre);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Genre not found" });
    }
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Genre with this name already exists" });
    }
    res.status(500).json({ error: "Failed to update genre" });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    await GenreService.deleteGenre(id);

    res
      .status(200)
      .json({ success: true, message: "Genre deleted successfully" });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.status(500).json({ error: "Failed to delete genre" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const genre = await GenreService.getById(id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.json(genre);
  } catch (err) {
    res.status(400).json({ error: "Genre not found" });
  }
};
