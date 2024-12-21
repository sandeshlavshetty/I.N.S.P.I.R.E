import { NextResponse } from "next/server";
import {connectToProjectDB} from "@/lib/mongodb";
import Project from "@/models/projects"; // Ensure the Project schema is defined

export async function PATCH(req: NextResponse, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the project ID from the route params

    try {
        await connectToProjectDB(); // Connect to the database

        const body = await req.json(); // Parse the request body

        // Validate if the ID is provided
        if (!id) {
            return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
        }

        // Update the project in the database
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: body }, // Update the fields based on the request body
            { new: true }   // Return the updated document
        );

        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Project updated successfully.", project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
