import type {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request{
	user? : {
		userId: string;
    role: string;
	}
}

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")){
		res.status(401).json({ error: "Access denied. Token missing." });
    return;
	}


const parts = authHeader.split(" ");
const token = parts[1];

if (!token) {
  res.status(401).json({ error: "Token not found in header." });
  return;
}

	try{
		const secret = process.env.JWT_SECRET;
		if (!secret) {
  		throw new Error("Internal Server Error: JWT_SECRET is missing");
		}
		const decoded = jwt.verify(token, secret) as TokenPayload;
		req.user = decoded;
		next();
		
	} catch {
		res.status(403).json({ error: "Invalid token" });
	
	}
}