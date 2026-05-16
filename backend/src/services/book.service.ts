import prisma from "../prisma.js";

interface UpdateBookInput {
  title?: string;
  authorId?: string;
  genreId?: string;
  shelfId?: string;
}

export class BookService {
  static async getAll() {
    return await prisma.book.findMany({
      include: {
        author: true,
        genre: true,
        shelf: true
      }
    })
  }

  static async getById(id: string) {
    return await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        genre: true,
        shelf: true
      }
    })
  }

  static async deleteBook(id: string) {
    return await prisma.book.delete({
      where: { id }
    })
  }

  static async updateBook(id: string, data: UpdateBookInput) {
    const currentBook = await prisma.book.findUnique({ where: { id } })
    if (!currentBook) throw new Error("Book not found")

    if (data.genreId || data.shelfId) {
      const targetGenreId = data.genreId || currentBook.genreId
      const targetShelfId = data.shelfId || currentBook.shelfId

      const shelf = await prisma.shelf.findUnique({ where: { id: targetShelfId } })
      if (!shelf) throw new Error("Shelf not found")
      
      if (shelf.genreId !== targetGenreId) {
        throw new Error("Shelf and genre must be the same")
      }
    }

    return await prisma.book.update({
      where: { id },
      data
    })
  }

  static async createBook(title: string, authorId: string, genreId: string, shelfId: string) {
    const genre = await prisma.genre.findUnique({ where: { id: genreId } })
    if (!genre) throw new Error("Genre not found")

    const author = await prisma.author.findUnique({ where: { id: authorId } })
    if (!author) throw new Error("Author not found")

    const shelf = await prisma.shelf.findUnique({ where: { id: shelfId } })
    if (!shelf) throw new Error("Shelf not found")
    
    if (shelf.genreId !== genreId) {
      throw new Error("Shelf and genre must be the same")
    }
    
    return await prisma.book.create({
      data: {
        title,
        authorId,
        genreId,
        shelfId
      }
    })
  }
}