import prisma from "../prisma.js";

export class GenreService {
	static async getAll() {
		return await prisma.genre.findMany();
	}

	static async getById(id:string) {
		return await prisma.genre.findUnique({
			where:{
				id
			}
		})
	}

	static async createGenre(name:string) {
		const genre = await prisma.genre.findUnique({
			where:{
				name
			}	
		})
		if (genre) throw new Error("Genre already exists")
			else return await prisma.genre.create({
				data:{
					name
				}
			})
		
	}

}