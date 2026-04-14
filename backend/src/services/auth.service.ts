import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET


export class AuthService {
	static async register(email:string,password:string){
		const existingUser = await prisma.user.findUnique({
			where:{
				email
			}
		})
		if(existingUser) throw new Error("User already exists")
		const hashedPassword = await bcrypt.hash(password,10)
		const user = await prisma.user.create({
			data:{
				email,
				password:hashedPassword
			}
		})
		if (!JWT_SECRET) {
  throw new Error("Internal Server Error: JWT_SECRET is missing");
}
		const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    return { user, token };
	}

	static async login(email:string,password:string){
		const user = await prisma.user.findUnique({
			where:{
				email
			}
		})
		if(!user) throw new Error("User not found")
		const isPasswordValid = await bcrypt.compare(password,user.password)
		if(!isPasswordValid) throw new Error("Invalid password")
		if (!JWT_SECRET) {
  		throw new Error("Internal Server Error: JWT_SECRET is missing");
		}
		const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
		return { user, token };
	}
}
