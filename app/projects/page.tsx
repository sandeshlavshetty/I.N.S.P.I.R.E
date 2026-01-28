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
    const [projects, setProjects] = useState<any[]>([
        {
            id: 1,
            owner: "Priya Sharma",
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce platform with React, Node.js, and MongoDB. Features include product catalog, shopping cart, payment integration, and admin dashboard.",
            githubRepoLink: "https://github.com/priyasharma/ecommerce-platform",
            liveOnLink: "https://ecommerce-demo.example.com",
            youtubeDemoLink: "https://youtube.com/watch?v=demo1",
            views: 342,
            likes: 28,
            downloads: 15,
        },
        {
            id: 2,
            owner: "Rajesh Patel",
            title: "Microservices Architecture",
            description: "Production-ready microservices architecture with Docker, Kubernetes, and message queues. Includes monitoring, logging, and API gateway.",
            githubRepoLink: "https://github.com/rajeshpatel/microservices",
            liveOnLink: "https://microservices-demo.example.com",
            youtubeDemoLink: "https://youtube.com/watch?v=demo2",
            views: 567,
            likes: 45,
            downloads: 32,
        },
        {
            id: 3,
            owner: "Ananya Verma",
            title: "Design System UI Components",
            description: "Comprehensive design system with reusable UI components. Built with React, Storybook, and styled-components. Includes documentation and examples.",
            githubRepoLink: "https://github.com/ananyaverma/design-system",
            liveOnLink: "https://design-system-demo.vercel.app",
            youtubeDemoLink: "https://youtube.com/watch?v=demo3",
            views: 423,
            likes: 38,
            downloads: 28,
        },
        {
            id: 4,
            owner: "Vikram Kumar",
            title: "Machine Learning Pipeline",
            description: "End-to-end ML pipeline for predictive analytics. Includes data processing, model training, and REST API endpoint for inference.",
            githubRepoLink: "https://github.com/vikramkumar/ml-pipeline",
            liveOnLink: "https://ml-pipeline-demo.herokuapp.com",
            youtubeDemoLink: "https://youtube.com/watch?v=demo4",
            views: 298,
            likes: 22,
            downloads: 18,
        },
        {
            id: 5,
            owner: "Priya Sharma",
            title: "Task Management App",
            description: "Collaborative task manager with real-time updates. Built with Next.js, TypeScript, and Firebase. Features team collaboration and notifications.",
            githubRepoLink: "https://github.com/priyasharma/task-manager",
            liveOnLink: "https://task-manager-demo.vercel.app",
            youtubeDemoLink: "https://youtube.com/watch?v=demo5",
            views: 512,
            likes: 41,
            downloads: 35,
        },
    ]);
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

                <div className="px-4 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">Project Showcase</h1>
                            <p className="text-sm text-muted-foreground mt-1">Discover amazing projects from the community</p>
                        </div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-primary text-white px-4 py-2 rounded-md mt-4 sm:mt-0 hover:bg-primary/90"
                        >
                            Upload Project
                        </button>
                    </div>
                    <Separator className="mb-6" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                                onClick={() => window.location.href = `/projects/${project.id}/view`}
                            >
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40"></div>
                                <div className="p-5">
                                    <div className="mb-3">
                                        <h3 className="text-lg font-semibold">{project.title}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">By {project.owner}</p>
                                    </div>
                                    <p className="text-sm text-foreground mb-4 line-clamp-2">{project.description}</p>
                                    
                                    <div className="flex justify-between text-sm text-muted-foreground mb-4 border-t pt-3">
                                        <span>👁️ {project.views} views</span>
                                        <span>❤️ {project.likes} likes</span>
                                        <span>⬇️ {project.downloads} downloads</span>
                                    </div>
                                    
                                    <div className="flex gap-2 justify-between">
                                        <Link
                                            href={project.liveOnLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-blue-100 text-blue-700 py-2 rounded text-sm font-medium hover:bg-blue-200 text-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Live Demo
                                        </Link>
                                        <Link
                                            href={project.githubRepoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-gray-900 text-white py-2 rounded text-sm font-medium hover:bg-gray-800 text-center flex items-center justify-center gap-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <GitHubLogoIcon width={16} height={16} /> GitHub
                                        </Link>
                                    </div>
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
