import prisma from "../prisma.js";

export class AuthorService {

	static async getAll() {
		return await prisma.author.findMany();
	}

	static async getById(id:string) {
		return await prisma.author.findUnique({
			where:{
				id
			}
		})
	}

	static async createAuthor(name:string) {
		const author = await prisma.author.findUnique({
				where:{
					name
				}
			})
		if (author) throw new Error("Author already exists")
		else return await prisma.author.create({
			data:{
				name
			}
		})
	}
}

