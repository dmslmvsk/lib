import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export class AuthService {
	static async register(email:string,password:string){
		const secret = process.env.JWT_SECRET;
		if (!secret) {
  throw new Error("Internal Server Error: JWT_SECRET is missing");
}
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
		
		const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: "1d" });

    return { user, token };
	}

	static async login(email:string,password:string){
		const secret = process.env.JWT_SECRET;
		if (!secret) {
  		throw new Error("Internal Server Error: JWT_SECRET is missing");
		}
		const user = await prisma.user.findUnique({
			where:{
				email
			}
		})
		if(!user) throw new Error("User not found")
		const isPasswordValid = await bcrypt.compare(password,user.password)
		if(!isPasswordValid) throw new Error("Invalid password")
		
		const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: "1d" });
		return { user, token };
	}
}
