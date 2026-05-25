import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    const { role } = req.body;
    const updated = await UserService.updateRole(id, role);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update user role" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    await UserService.delete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const profile = await UserService.getProfile(userId);

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
};
