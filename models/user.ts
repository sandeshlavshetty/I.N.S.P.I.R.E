import mongoose, { Schema, model, models } from "mongoose";
import { getUsersDB } from "@/lib/db"; // Import the function to get the connection for Users DB

const userSchema = new Schema(
    {
        name: { type: String, required: true }, // User's full name
        email: { type: String, required: true, unique: true }, // Email address
        password: { type: String, required: true }, // Hashed password for authentication
        avatar: { type: String, default: "/default-avatar.png" }, // Profile picture URL
        title: { type: String, default: "Developer" }, // User's title/role (e.g., "Full Stack Developer")
        bio: { type: String, default: "" }, // Short bio/description about the user
        stats: {
            projects: { type: Number, default: 0 }, // Number of projects
            polls: { type: Number, default: 0 }, // Number of polls created/participated in
            achievements: { type: Number, default: 0 }, // Number of achievements
        },
        socialLinks: {
            github: { type: String, default: "" }, // GitHub profile URL
            linkedin: { type: String, default: "" }, // LinkedIn profile URL
            website: { type: String, default: "" }, // Personal website URL
        },
        projects: [
            {
                title: { type: String, required: true }, // Project title
                description: { type: String, required: true }, // Short description of the project
                previewImage: { type: String, default: "" }, // URL for the project preview image
                projectLink: { type: String, required: true }, // Link to view the project
            },
        ],
        recentActivities: [
            { type: String }, // A log of user's recent activities
        ],
        btid: { type: String, default: "" }, // Bus ticket ID or similar unique identifier
        approval: { type: Number, default: 0 }, // Approval status (e.g., pending, approved, rejected)
        chosen_option: { type: String, default: "" }, // Selected option (for polls, preferences, etc.)
        d_optn: { type: String, default: "" }, // Additional option or decision-related data
        role: { type: String, default: "student", enum: ["student", "admin"] }, // User's role
        googleId: { type: String, default: null }, // ID if the user logged in via Google
        provider: { type: String, default: "local", enum: ["local", "google"] }, // Auth provider
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Ensure the model is connected to the correct Users DB
export default async function getUserModel() {
    const connection = await getUsersDB(); // Get the Users DB connection
    return connection.model("User", userSchema); // Bind the schema to the Users DB
}
