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
import { Link2 } from "lucide-react"

export default function Page() {
    const [isClient, setIsClient] = useState(false);
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Project One",
            intro: "This is an introduction to Project One.",
            liveLink: "https://example.com/project-one",
            githubLink: "https://github.com/example/project-one",
        },
        {
            id: 2,
            title: "Project Two",
            intro: "This is an introduction to Project Two.",
            liveLink: "https://example.com/project-two",
            githubLink: "https://github.com/example/project-two",
        },
        {
            id: 3,
            title: "Project Three",
            intro: "This is an introduction to Project Three.",
            liveLink: "https://example.com/project-three",
            githubLink: "https://github.com/example/project-three",
        }
    ]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header with Breadcrumb */}
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 flex gap-2">
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

                {/* Main Section */}
                <div className="px-4 py-10">
                    {/* Upload Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-bold">Project Showcase Board</h1>
                        <Link
                            href="/upload-project"
                            className="bg-primary text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md mt-4 sm:mt-0"
                        >
                            Upload Project
                        </Link>
                    </div>
                    <div className="my-5">
                        <Separator />
                    </div>
                    {/* Projects Showcase */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        {/* Individual Projects */}
                        {projects.map((project) => (
                            <Link href={`/projects/${project.id}/view`} key={project.id}>
                                <div key={project.id} className="w-full max-w-sm bg-muted/50 rounded-lg shadow-md p-4">
                                    <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                                    <div className="bg-muted h-32 mb-4 rounded-md"></div>
                                    <p className="text-sm text-muted-foreground">{project.intro}</p>
                                    <div className="flex gap-2 mt-4 mx-2 justify-between">
                                        <Link
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-primary text-white p-2 hover:bg-primary-dark"
                                            title="Live"
                                        >
                                            <Link2 width={25} height={25} />
                                        </Link>
                                        <Link
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-primary text-white p-2 hover:bg-primary-dark"
                                            title="GitHub"
                                        >
                                            <GitHubLogoIcon width={25} height={25} />
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
