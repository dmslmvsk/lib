import prisma from "../prisma.js";

interface UpdateShelfInput {
  label?: string;
  libraryId?: string;
  genreId?: string;
}

export class ShelfService {
  static async getAll() {
    return await prisma.shelf.findMany({
      include: {
        genre: true,
        books: true,
        library: true,
      },
    });
  }

  static async getById(id: string) {
    return await prisma.shelf.findUnique({
      where: { id },
      include: {
        genre: true,
        books: true,
        library: true,
      },
    });
  }

  static async createShelf(label: string, libraryId: string, genreId: string) {
    const existingShelf = await prisma.shelf.findFirst({
      where: { label },
    });

    if (existingShelf) throw new Error("Shelf already exists");

    const library = await prisma.library.findUnique({
      where: { id: libraryId },
    });
    if (!library) throw new Error("Library not found");

    const genre = await prisma.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) throw new Error("Genre not found");

    return await prisma.shelf.create({
      data: {
        label,
        libraryId,
        genreId,
      },
    });
  }

  static async updateShelf(id: string, data: UpdateShelfInput) {
    if (data.genreId) {
      const genre = await prisma.genre.findUnique({
        where: { id: data.genreId },
      });
      if (!genre) throw new Error("Genre not found");
    }

    if (data.libraryId) {
      const library = await prisma.library.findUnique({
        where: { id: data.libraryId },
      });
      if (!library) throw new Error("Library not found");
    }

    return await prisma.shelf.update({
      where: { id },
      data,
    });
  }

  static async deleteShelf(id: string) {
    return await prisma.shelf.delete({
      where: { id },
    });
  }
}
