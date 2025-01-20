import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config();

type ConnectionType = {
    [key: string]: mongoose.Connection | null;
};

const connections: ConnectionType = {
    users: null,
    projects: null,
    polls: null,
};

// Helper function to create a connection
async function createConnection(uri: string, dbName: string) {
    if (!connections[dbName]) {
        try {
            const connection = await mongoose.createConnection(uri, {
                dbName,
            });
            connections[dbName] = connection;
            console.log(`[${dbName}] Connected successfully.`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`[${dbName}] Connection error: ${error.message}`);
            } else {
                console.error(`[${dbName}] Connection error: ${String(error)}`);
            }
            throw new Error(`[${dbName}] Connection failed.`);
        }
    }
    return connections[dbName];
}

// Expose functions for each database
export async function getUsersDB() {
    const MONGO_USER_URI = process.env.MONGO_USER_URI || "";
    return await createConnection(MONGO_USER_URI, "users");
}

export async function getProjectsDB() {
    const MONGO_PROJECT_URI = process.env.MONGO_PROJECT_URI || "";
    return await createConnection(MONGO_PROJECT_URI, "projects");
}

export async function getPollsDB() {
    const MONGO_POLL_URI = process.env.MONGO_POLL_URI || "";
    return await createConnection(MONGO_POLL_URI, "polls");
}
