import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGO_POLL_URI = process.env.MONGO_POLL_URI || "";
const MONGO_USER_URI = process.env.MONGO_USER_URI || "";
const MONGO_PROJECTS_URI = process.env.MONGO_PROJECT_URI || "";

// Helper function to validate environment variables
function checkEnvVariables() {
	const missingVariables = [];

	if (!MONGO_POLL_URI) missingVariables.push("MONGO_POLL_URI");
	if (!MONGO_USER_URI) missingVariables.push("MONGO_URI_USER");
	if (!MONGO_PROJECTS_URI) missingVariables.push("MONGO_URI_PROJECTS");

	if (missingVariables.length > 0) {
		throw new Error(
			`Please define the following environment variables: ${missingVariables.join(", ")}`
		);
	}
}

checkEnvVariables();

// Connection states
const connectionStates = {
	Poll: false,
	User: false,
	Project: false,
};

// Generalized connection logic
async function connectToDB(uri: string, dbName: keyof typeof connectionStates): Promise<void> {
	if (connectionStates[dbName]) return;

	try {
		await mongoose.connect(uri);
		connectionStates[dbName] = true;
		console.log(`Connected to ${dbName} MongoDB`);
	} catch (error) {
		console.error(`Error connecting to ${dbName} MongoDB:`, error);
		throw new Error(`Failed to connect to ${dbName} MongoDB`);
	}
}

export async function connectToPollDB() {
	if (connectionStates["Poll"]) {
		return;
	} else {
		await connectToDB(MONGO_POLL_URI, "Poll");
	}
}

export async function connectToUserDB() {
	if (connectionStates["User"]) {
		return;
	} else {
		await connectToDB(MONGO_USER_URI, "User");
	}
}

export async function connectToProjectDB() {
	if (connectionStates["Project"]) {
		return;
	} else {
		await connectToDB(MONGO_PROJECTS_URI, "Project");
	}
}

connectToUserDB();
connectToPollDB();
connectToProjectDB();