import mongoose, { Schema, model, models } from "mongoose";
import { getPollsDB } from "@/lib/db"; // Import the function to get the connection for Polls DB

interface IPoll {
    name: string;
    options: { [option: string]: number }; // Using an object with time as key and votes as value
    date: Date;
    status: "pending" | "active" | "ended";
}

const pollSchema = new Schema<IPoll>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    options: [
        {
            option: { type: String, required: true },
            votes: { type: Number, default: 0 },
        },
    ],
    date: {
        type: Date,
        required: true,
        validate: {
            validator: (date: Date) => date.getTime() > Date.now(),
            message: "The date must be in the future",
        },
    },
    status: {
        type: String,
        enum: ["pending", "active", "ended"],
        default: "pending",
    },
});

// Ensure the model is connected to the correct Polls DB
export default async function getPollModel() {
    const connection = await getPollsDB(); // Get the Polls DB connection
    return connection.model("Poll", pollSchema); // Bind the schema to the Polls DB
}
