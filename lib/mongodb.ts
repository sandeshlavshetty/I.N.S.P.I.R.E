import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGO_POLL_URI = process.env.MONGO_POLL_URI || "";
const MONGO_USER_URI = process.env.MONGO_USER_URI || "";
const MONGO_PROJECT_URI = process.env.MONGO_PROJECT_URI || "";

// Helper function to validate environment variables
function checkEnvVariables() {
	const missingVariables = [];

	if (!MONGO_POLL_URI) missingVariables.push("MONGO_POLL_URI");
	if (!MONGO_USER_URI) missingVariables.push("MONGO_URI_USER");
	if (!MONGO_PROJECT_URI) missingVariables.push("MONGO_URI_PROJECT");

	if (missingVariables.length > 0) {
		throw new Error(
			`Please define the following environment variables: ${missingVariables.join(", ")}`
		);
	}
}

checkEnvVariables();

// Generalized connection logic
async function connectToDB(uri: string, dbName: string): Promise<void> {
	// Check the current connection state
	if (mongoose.connection.readyState === 1) {
		console.log(`[${dbName}] MongoDB connection already established.`);
		return;
	}

	try {
		await mongoose.connect(uri, {
			connectTimeoutMS: 10000, // Optional timeout for connection
		});
		console.log(`[${dbName}] Connected to MongoDB`);
	} catch (error: any) {
		console.error(`[${dbName}] MongoDB Connection Error:`, error.message || error);
		throw new Error(`[${dbName}] MongoDB Connection Failed`);
	}
}

export async function connectToPollDB() {
	await connectToDB(MONGO_POLL_URI, "Poll");
}

export async function connectToUserDB() {
	await connectToDB(MONGO_USER_URI, "User");
}

export async function connectToProjectDB() {
	await connectToDB(MONGO_PROJECT_URI, "Project");
}
