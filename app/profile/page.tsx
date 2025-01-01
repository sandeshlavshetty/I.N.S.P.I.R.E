"use client";

import React, { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import avatarImg from "@/app/assets/pfp.png";
import withAuth from "@/lib/withAuth";
import { useUserContext } from "../context/UserContext"; // Importing the user context
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { MdOutlinePoll } from "react-icons/md";
import { NavActions } from "@/components/nav-actions";

function ProfilePage() {
    const { user, setUser } = useUserContext(); // Access the user context

    // Fetch user data if not already available in context
    useEffect(() => {
        if (!user) {
            // Fetch user data from your API or use default data
            const fetchedUserData = {
                name: "Jane Doe",
                email: "jane.doe@example.com",
                avatar: avatarImg.src,
                title: "Full Stack Developer",
                bio: "Passionate developer with experience in building web and mobile applications.",
                stats: { projects: 12, polls: 7, achievements: 3 },
                socialLinks: {
                    github: "https://github.com/janedoe",
                    linkedin: "https://linkedin.com/in/janedoe",
                    website: "https://janedoe.dev"
                },
                role: "Admin",
                btid: "BT-1234",
                approval: 1,
                chosen_option: "Option 1",
                d_optn: "Option 2",
                projects: []
            };

            setUser(fetchedUserData); // Update user context
            console.log("Fetched user data:", user);
        }
    }, [user, setUser]);

    // If user data is not available yet, show loading
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <SidebarProvider>
                <AppSidebar />
                {/* Add extra left padding to increase the gap */}
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
                    <main className="flex-1 pl-10 md:pl-16 lg:pl-[8em] p-8 space-y-10">
                        {/* Header Section */}
                        <section className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 text-center md:text-left">
                            <Avatar className="h-24 w-24 rounded-full border-4 border-gray-300 p-1 shadow-lg">
                                <AvatarImage src={user.avatar} alt="User Avatar" />
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <p className="text-gray-600">{user.title}</p>
                                <p className="mt-3 text-gray-500">{user.bio}</p>
                                <div className="mt-6 flex gap-4">
                                    <Button variant="outline" className="text-gray-800">Projects: {user.stats.projects}</Button>
                                    <Button variant="outline" className="text-gray-800">Polls: {user.stats.polls}</Button>
                                    <Button variant="outline" className="text-gray-800">Achievements: {user.stats.achievements}</Button>
                                </div>
                            </div>
                        </section>

                        {/* User Projects Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {user.projects && user.projects.map((project) => (
                                    <Card key={project.id} className="border border-gray-200 rounded-lg shadow-md">
                                        <CardHeader className="p-0">
                                            <img
                                                src={project.liveOnLink}
                                                alt="Project Preview"
                                                className="w-full h-40 object-cover rounded-t-md"
                                            />
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <h3 className="text-lg font-bold">{project.title}</h3>
                                            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                                            <Link href={project.liveOnLink}>
                                                <Button variant="link" className="text-blue-600">
                                                    View Project
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Social & Links Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
                            <div className="flex space-x-6">
                                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                                    <FiGithub className="h-6 w-6" />
                                </a>
                                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
                                    <FiLinkedin className="h-6 w-6" />
                                </a>
                                <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-700">
                                    <FiExternalLink className="h-6 w-6" />
                                </a>
                            </div>
                        </section>
                    </main>
                </SidebarInset>
        </SidebarProvider >
    );
}

export default withAuth(ProfilePage);
