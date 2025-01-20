import { Schema, model, models } from "mongoose";
import { getProjectsDB } from "@/lib/db"; // Import the function to get the connection for Projects DB

const projectSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    githubRepoLink: {
        type: String,
        required: true,
    },
    liveOnLink: {
        type: String,
        required: true,
    },
    youtubeDemoLink: {
        type: String,
    },
});

// Ensure the model is connected to the correct Projects DB
export default async function getProjectModel() {
    const connection = await getProjectsDB(); // Get the Projects DB connection
    return connection.model("Project", projectSchema); // Bind the schema to the Projects DB
}
