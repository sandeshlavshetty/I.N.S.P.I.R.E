"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { SidebarProvider } from "@/components/ui/sidebar";
import avatarImg from "@/app/assets/pfp.png"
import Link from "next/link";

// Sample Data
const userData = {
    name: "Jane Doe",
    title: "Full Stack Developer",
    bio: "Passionate developer with experience in building web and mobile applications.",
    stats: { projects: 12, polls: 7, achievements: 3 },
    socialLinks: {
        github: "https://github.com/janedoe",
        linkedin: "https://linkedin.com/in/janedoe",
        website: "https://janedoe.dev"
    },
    projects: [
        {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio showcasing my work and skills.",
            previewImage: "/images/portfolio.jpg",
            projectLink: "/projects/1/view",
        },
        {
            id: 2,
            title: "E-commerce App",
            description: "A full-fledged e-commerce application with React and Node.",
            previewImage: "/images/ecommerce.jpg",
            projectLink: "/projects/2/view",
        }
    ],
    recentActivities: [
        "Completed the Bug Bounty Blitz competition.",
        "Added a new project: 'Machine Learning Playground'.",
        "Achieved a milestone in Poll Participation."
    ]
};

export default function ProfilePage() {
    return (
        <SidebarProvider>
            <div className="flex">
                <AppSidebar />
                {/* Add extra left padding to increase the gap */}
                <main className="flex-1 pl-10 md:pl-16 lg:pl-[8em] p-8 space-y-10">

                    {/* Header Section */}
                    <section className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 text-center md:text-left">
                        <Avatar className="h-24 w-24 rounded-full border-4 border-gray-300 p-1 shadow-lg" >
                        <AvatarImage src={avatarImg.src}></AvatarImage>

                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold">{userData.name}</h1>
                            <p className="text-gray-600">{userData.title}</p>
                            <p className="mt-3 text-gray-500">{userData.bio}</p>
                            <div className="mt-6 flex gap-4">
                                <Button variant="outline" className="text-gray-800">Projects: {userData.stats.projects}</Button>
                                <Button variant="outline" className="text-gray-800">Polls: {userData.stats.polls}</Button>
                                <Button variant="outline" className="text-gray-800">Achievements: {userData.stats.achievements}</Button>
                            </div>
                        </div>
                    </section>

                    {/* User Projects Section */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {userData.projects.map((project) => (
                                <Card key={project.id} className="border border-gray-200 rounded-lg shadow-md">
                                    <CardHeader className="p-0">
                                        <img
                                            src={project.previewImage}
                                            alt="Project Preview"
                                            className="w-full h-40 object-cover rounded-t-md"
                                        />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-bold">{project.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                                        <Link href={project.projectLink}>
                                            <Button variant="link" className="text-blue-600">
                                                View Project
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Recent Activity Section */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600">
                            {userData.recentActivities.map((activity, index) => (
                                <li key={index} className="text-sm">
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Social & Links Section */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
                        <div className="flex space-x-6">
                            <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                                <FiGithub className="h-6 w-6" />
                            </a>
                            <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
                                <FiLinkedin className="h-6 w-6" />
                            </a>
                            <a href={userData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-700">
                                <FiExternalLink className="h-6 w-6" />
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </SidebarProvider>
    );
}
