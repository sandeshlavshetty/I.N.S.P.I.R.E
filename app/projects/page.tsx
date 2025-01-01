"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlinePoll } from "react-icons/md";
import { Link2 } from "lucide-react";
import withAuth from "@/lib/withAuth";

function Page() {
    const [isClient, setIsClient] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({
        owner: "",
        title: "",
        description: "",
        githubRepoLink: "",
        liveOnLink: "",
        youtubeDemoLink: "",
    });

    useEffect(() => {
        setIsClient(true);

        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.error("Failed to fetch projects.");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({ ...prev, [name]: value }));
    };

    const validateInput = () => {
        const { owner, title, description, githubRepoLink, liveOnLink } = newProject;
        if (!owner || !title || !description || !githubRepoLink || !liveOnLink) {
            alert("All fields except 'YouTube Demo Link' are required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInput()) return;

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                const createdProject = await response.json();
                setProjects((prev) => [...prev, createdProject.project]);
                setModalOpen(false);
                setNewProject({
                    owner: "",
                    title: "",
                    description: "",
                    githubRepoLink: "",
                    liveOnLink: "",
                    youtubeDemoLink: "",
                });
            } else {
                console.error("Failed to upload project.");
            }
        } catch (error) {
            console.error("Error submitting project:", error);
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="flex gap-2">
                                        <MdOutlinePoll className="h-[15px] w-[15px]" />
                                        Project Showcase
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>

                <div className="px-4 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Project Showcase Board
                        </h1>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-primary text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md mt-4 sm:mt-0"
                        >
                            Upload Project
                        </button>
                    </div>
                    <div className="my-5">
                        <Separator />
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="w-full max-w-sm bg-muted/50 rounded-lg shadow-md p-4 cursor-pointer"
                                onClick={() => window.location.href = `/projects/${project.id}/view`}
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {project.description}
                                </p>
                                <div className="flex gap-2 mt-4 mx-2 justify-between">
                                    <Link
                                        href={project.liveOnLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-primary text-white p-2 hover:bg-primary-dark"
                                        title="Live"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Link2 width={25} height={25} />
                                    </Link>
                                    <Link
                                        href={project.githubRepoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-primary text-white p-2 hover:bg-primary-dark"
                                        title="GitHub"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <GitHubLogoIcon width={25} height={25} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg">
                            <h2 className="text-xl font-bold mb-4">Upload New Project</h2>
                            <input
                                type="text"
                                name="owner"
                                placeholder="Owner Name"
                                value={newProject.owner}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder="Project Title"
                                value={newProject.title}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <textarea
                                name="description"
                                placeholder="Project Description"
                                value={newProject.description}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="githubRepoLink"
                                placeholder="GitHub Repository Link"
                                value={newProject.githubRepoLink}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="liveOnLink"
                                placeholder="Live Project Link"
                                value={newProject.liveOnLink}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="youtubeDemoLink"
                                placeholder="YouTube Demo Link"
                                value={newProject.youtubeDemoLink}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-muted px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-primary text-white px-4 py-2 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(Page);
