"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Import from next/navigation
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { MdOutlineEdit } from "react-icons/md";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "@/components/nav-actions";
import withAuth from "@/lib/withAuth";

function EditProjectPage() {
    const router = useRouter();
    const { projectid } = useParams(); // Get the project id from the URL

    const [project, setProject] = useState({
        owner: "",
        title: "",
        description: "",
        githubRepoLink: "",
        liveOnLink: "",
        youtubeDemoLink: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch all projects and set the one matching projectid
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched Projects:", data); // Log fetched projects for debugging
    
                    const selectedProject = data.find((proj: any) => proj._id === projectid);
                    if (selectedProject) {
                        console.log("Selected Project:", selectedProject); // Log selected project
                        setProject(selectedProject);
                    } else {
                        console.error("Project not found.");
                    }
                } else {
                    console.error("Failed to fetch projects.");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchProjects();
    }, [projectid]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`/api/projects/${projectid}/edit`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: project.title,
                    description: project.description,
                    githubRepoLink: project.githubRepoLink,
                    liveOnLink: project.liveOnLink,
                }),
            });

            if (response.ok) {
                console.log("Project updated successfully.");
                router.push(`/projects/${projectid}`);
            } else {
                console.error("Failed to update project.");
            }
        } catch (error) {
            console.error("Error updating project:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
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
                                        <MdOutlineEdit className="h-[15px] w-[15px]" />
                                        Edit Project
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>

                {/* Centering the form using Flexbox */}
                <div className="flex justify-center items-center min-h-screen p-8">
                    <div className="w-full max-w-2xl bg-muted/50 p-8 rounded-md shadow-md">
                        {/* Project Title */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Project Title</label>
                            <Input
                                type="text"
                                name="title"
                                value={project.title}
                                onChange={handleChange}
                                placeholder="Enter project title"
                                className="w-full"
                            />
                        </div>

                        {/* Project Description */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Description</label>
                            <Textarea
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                placeholder="Enter project description"
                                className="w-full"
                            />
                        </div>

                        {/* GitHub Link */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">GitHub Link</label>
                            <Input
                                type="url"
                                name="github"
                                value={project.githubRepoLink}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="w-full"
                            />
                        </div>

                        {/* Live Link */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Live Link</label>
                            <Input
                                type="url"
                                name="live"
                                value={project.liveOnLink}
                                onChange={handleChange}
                                placeholder="https://yourprojectlive.com"
                                className="w-full"
                            />
                        </div>

                        {/* Save and Cancel Buttons */}
                        <div className="flex justify-between">
                            <Button variant="secondary" onClick={() => router.push(`/projects/${projectid}`)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(EditProjectPage);
