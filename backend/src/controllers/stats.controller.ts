import type { Request, Response } from "express";
import prisma from "../prisma.js";

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const [books, users, authors, borrowed] = await Promise.all([
      prisma.book.count(),
      prisma.user.count(),
      prisma.author.count(),
      // Считаем книги, у которых userId не пустой (значит, они на руках)
      prisma.book.count({ where: { NOT: { userId: null } } }),
    ]);

    res.json({ books, users, authors, borrowed });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};