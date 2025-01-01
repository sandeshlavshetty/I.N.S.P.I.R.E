import { NextResponse } from "next/server";
import getProjectModel from "@/models/projects";  // Dynamic model import
import { NextRequest } from "next/server";

// Define the ProjectType interface
interface ProjectType {
    _id: string;
    owner: string;
    title: string;
    description: string;
    githubRepoLink: string;
    liveOnLink: string;
    youtubeDemoLink?: string; // Optional field
}

// Declare the projects variable to hold the data
let projects: ProjectType[] = []; // Initialize as an empty array

// POST and GET handler for projects
interface ProjectRequestBody {
    owner: string;
    title: string;
    description: string;
    githubRepoLink: string;
    liveOnLink: string;
    youtubeDemoLink?: string; // Optional field
}

// Utility function to add CORS headers
function withCORS(response: Response) {
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.append("Access-Control-Allow-Headers", "Content-Type");
    return response;
}

export async function POST(req: NextRequest) {
    try {
        console.log("Received project creation request.");

        // Parse the request body
        const {
            owner,
            title,
            description,
            githubRepoLink,
            liveOnLink,
            youtubeDemoLink,
        }: ProjectRequestBody = await req.json();
        console.log("Parsed request data:", { owner, title, description });

        // Validate required fields
        if (!owner || !title || !description || !githubRepoLink || !liveOnLink) {
            console.log("Validation failed: missing fields.");
            return withCORS(
                NextResponse.json(
                    {
                        error: "Please provide all required fields: owner, title, description, githubRepoLink, and liveOnLink.",
                    },
                    { status: 400 }
                )
            );
        }

        // Validate URL format using regex
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (![githubRepoLink, liveOnLink].every((link) => urlRegex.test(link))) {
            console.log("Invalid URL format.");
            return withCORS(
                NextResponse.json(
                    {
                        error: "Invalid URL format for githubRepoLink or liveOnLink.",
                    },
                    { status: 400 }
                )
            );
        }

        // Get the Project model dynamically
        const Project = await getProjectModel();

        // Create a new project
        const newProject = new Project({
            owner,
            title,
            description,
            githubRepoLink,
            liveOnLink,
            youtubeDemoLink,
        });

        // Save the project to the database
        await newProject.save();
        console.log("Project saved to database:", newProject);

        // Update the in-memory projects variable
        projects.push({
            _id: newProject._id.toString(),
            owner: newProject.owner,
            title: newProject.title,
            description: newProject.description,
            githubRepoLink: newProject.githubRepoLink,
            liveOnLink: newProject.liveOnLink,
            youtubeDemoLink: newProject.youtubeDemoLink ?? undefined,
        });

        // Return a success response
        return withCORS(
            NextResponse.json(
                {
                    message: "Project created successfully.",
                    project: {
                        id: newProject._id,
                        owner: newProject.owner,
                        title: newProject.title,
                        description: newProject.description,
                        githubRepoLink: newProject.githubRepoLink,
                        liveOnLink: newProject.liveOnLink,
                        youtubeDemoLink: newProject.youtubeDemoLink,
                    },
                },
                { status: 201 }
            )
        );
    } catch (error) {
        console.error("Error during project creation:", error);

        // Handle unexpected server errors
        return withCORS(
            NextResponse.json(
                { error: "Internal Server Error." },
                { status: 500 }
            )
        );
    }
}

export async function GET() {
    try {
        console.log("Received project fetch request.");

        // Check if the projects array is empty; if so, fetch from the database
        if (projects.length === 0) {
            console.log("Projects list is empty. Fetching from database.");

            // Get the Project model dynamically
            const Project = await getProjectModel();

            // Fetch all projects from the database
            const dbProjects = await Project.find().sort({ createdAt: -1 });
            console.log("Fetched projects:", dbProjects);

            // Update the in-memory projects variable
            projects = dbProjects.map((project) => ({
                _id: project._id.toString(),
                owner: project.owner,
                title: project.title,
                description: project.description,
                githubRepoLink: project.githubRepoLink,
                liveOnLink: project.liveOnLink,
                youtubeDemoLink: project.youtubeDemoLink ?? undefined,
            }));
        }

        // Return the projects
        return withCORS(
            NextResponse.json(projects, { status: 200 })
        );
    } catch (error) {
        console.error("Error fetching projects:", error);

        // Handle unexpected server errors
        return withCORS(
            NextResponse.json(
                { error: "Internal Server Error." },
                { status: 500 }
            )
        );
    }
}
