import { NextResponse } from "next/server";
import getProjectModel from "@/models/projects"; // Dynamic model import

export async function PATCH(req: NextResponse, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the project ID from the route params

    if (!id) {
        return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    try {
        // Get the Project model dynamically
        const Project = await getProjectModel();

        // Parse the request body
        const body = await req.json();

        // Ensure that the body contains at least one field to update
        if (Object.keys(body).length === 0) {
            return NextResponse.json({ error: "No fields provided for update." }, { status: 400 });
        }

        // Update the project in the database
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: body }, // Update the fields based on the request body
            { new: true }    // Return the updated document
        );

        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found." }, { status: 404 });
        }

        return NextResponse.json({
            message: "Project updated successfully.",
            project: updatedProject
        });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
