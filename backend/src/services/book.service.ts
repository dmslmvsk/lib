import prisma from "../prisma.js";

interface UpdateBookInput {
  title?: string;
  authorId?: string;
  genreId?: string;
  shelfId?: string;
  description?:string;
}

export class BookService {
  
  static async getAll(filters: { search?: string; genreId?: string }) {
  const { search, genreId } = filters;

  const whereClause: any = {
    ...(genreId && { genreId }),
    
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { author: { name: { contains: search, mode: 'insensitive' as const } } }
      ]
    })
  };

  return await prisma.book.findMany({
    where: whereClause,
    include: {
      author: true,
      genre: true,
      shelf: {
        include: { library: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

  

  static async getById(id: string) {
  return await prisma.book.findUnique({
    where: { id },
    include: {
      author: true,
      genre: true,
      shelf: {
        include: {
          library: true
        }
      }
    }
  });
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

  static async borrowBook(bookId: string, userId: string) {
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      throw new Error("BOOK_NOT_FOUND");
    }

    if (book.userId) {
      throw new Error("BOOK_ALREADY_BORROWED");
    }

    return await prisma.book.update({
      where: { id: bookId },
      data: {
        userId: userId
      },
      include: {
        author: true,
        genre: true,
        shelf: {
          include: { library: true }
        }
      }
    });
  }

  static async returnBook(bookId: string, userId: string, userRole: string) {
    const book = await prisma.book.findUnique({ 
      where: { id: bookId } 
    });

    if (!book) {
      throw new Error("BOOK_NOT_FOUND");
    }

    if (!book.userId) {
      throw new Error("BOOK_NOT_BORROWED");
    }

    if (book.userId !== userId && userRole !== "ADMIN") {
      throw new Error("FORBIDDEN_RETURN");
    }

    return await prisma.book.update({
      where: { id: bookId },
      data: { userId: null },
      include: {
        author: true,
        shelf: { include: { library: true } }
      }
    });
  }
}
