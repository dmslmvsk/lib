

import app from "./app.js"

console.log("Мой DATABASE_URL:", process.env.DATABASE_URL);
const PORT = process.env.BACKEND_PORT || 5000;

const startServer = () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server running at port ${PORT}`)})
		} catch (error) {
			console.error("Failed to start server:", error)
			process.exit(1)
		}

	}
startServer();