"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { EyeIcon } from "lucide-react";
import { NavActions } from "@/components/nav-actions";
import withAuth from "@/lib/withAuth";

// Define the ProjectType interface for the data structure
interface ProjectType {
    id: string;
    owner: string;
    title: string;
    description: string;
    githubRepoLink: string;
    liveOnLink: string;
    youtubeDemoLink?: string;
}

function ProjectViewPage() {
    const { resumeId } = useParams(); // Retrieve the project ID from the URL

    const [project, setProject] = useState<ProjectType | null>(null);

    useEffect(() => {
        // Fetch project data from the API
        const fetchProjectData = async () => {
            try {
                const response = await fetch("/api/projects");
                if (response.ok) {
                    const data: ProjectType[] = await response.json();
                    console.log("Fetched projects:", data);

                    // Find the project with the matching ID
                    const projectData = data.find((project) => project.id === resumeId);
                    if (projectData) {
                        setProject(projectData);
                    } else {
                        console.error("Project not found");
                    }
                } else {
                    console.error("Failed to fetch project data");
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        // Call the function to fetch project data
        fetchProjectData();
    }, [resumeId]);

    if (!project) {
        return (
            <div>Loading project data...</div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 flex gap-2">
                                        <EyeIcon className="h-[15px] w-[15px]" />
                                        View Project
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>

                <div className="p-6 max-w-5xl mx-auto bg-muted/50 rounded-md shadow-md">
                    {/* Project Title */}
                    <h1 className="text-2xl font-semibold mb-4">{project.title}</h1>

                    {/* YouTube Video */}
                    {project.youtubeDemoLink && (
                        <div className="aspect-w-16 aspect-h-9 mb-6">
                            <iframe
                                width="100%"
                                height="315"
                                src={project.youtubeDemoLink}
                                title="Project Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-md shadow-md"
                            ></iframe>
                        </div>
                    )}

                    {/* Project Description */}
                    <p className="text-lg mb-4">{project.description}</p>

                    {/* GitHub and Live Links */}
                    <div className="flex gap-4">
                        <Button asChild>
                            <a href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                        </Button>
                        <Button variant="secondary" asChild>
                            <a href={project.liveOnLink} target="_blank" rel="noopener noreferrer">
                                View Live Project
                            </a>
                        </Button>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(ProjectViewPage);
