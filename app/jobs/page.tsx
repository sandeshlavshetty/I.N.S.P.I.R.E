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
import withAuth from "@/lib/withAuth";

function Page() {
    const [isClient, setIsClient] = useState(false);
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Senior Full Stack Developer",
            company: "Tech Innovations Inc",
            location: "Remote",
            salary: "₹12-15 LPA",
            description: "We are looking for an experienced Full Stack Developer with expertise in React, Node.js, and MongoDB.",
            requirements: ["5+ years experience", "React & Node.js", "MongoDB", "AWS", "Docker"],
            postedDate: "2024-01-15",
            applicants: 24,
        },
        {
            id: 2,
            title: "React Developer",
            company: "Digital Solutions Ltd",
            location: "Bangalore",
            salary: "₹8-10 LPA",
            description: "Join our team to build amazing user interfaces with React and TypeScript.",
            requirements: ["3+ years experience", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
            postedDate: "2024-01-18",
            applicants: 45,
        },
        {
            id: 3,
            title: "Backend Engineer",
            company: "Cloud Systems Pvt Ltd",
            location: "Remote",
            salary: "₹10-13 LPA",
            description: "Design and develop scalable backend systems using microservices architecture.",
            requirements: ["4+ years experience", "Node.js/Python", "PostgreSQL", "Kubernetes", "CI/CD"],
            postedDate: "2024-01-12",
            applicants: 18,
        },
        {
            id: 4,
            title: "Frontend Engineer",
            company: "StartUp Hub",
            location: "Hyderabad",
            salary: "₹6-8 LPA",
            description: "Help build innovative web applications with modern frontend technologies.",
            requirements: ["2+ years experience", "JavaScript/React", "CSS", "Git", "Responsive Design"],
            postedDate: "2024-01-20",
            applicants: 62,
        },
        {
            id: 5,
            title: "Data Scientist",
            company: "Analytics Pro",
            location: "Remote",
            salary: "₹11-14 LPA",
            description: "Work with large datasets and build machine learning models to drive business insights.",
            requirements: ["3+ years experience", "Python", "Machine Learning", "TensorFlow", "SQL"],
            postedDate: "2024-01-19",
            applicants: 31,
        },
        {
            id: 6,
            title: "DevOps Engineer",
            company: "Infrastructure Plus",
            location: "Remote",
            salary: "₹9-12 LPA",
            description: "Manage cloud infrastructure and automate deployment pipelines.",
            requirements: ["4+ years experience", "AWS/GCP", "Docker", "Kubernetes", "Jenkins"],
            postedDate: "2024-01-17",
            applicants: 15,
        },
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
                    <header className="flex flex-col sm:flex-row items-center justify-between px-4 py-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">Job Opportunities</h1>
                            <p className="text-sm text-muted-foreground mt-1">Discover exciting career opportunities</p>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-md mt-4 sm:mt-0 hover:bg-primary/90">
                            Post a Job
                        </button>
                    </header>
                    <div className="my-5">
                        <Separator />
                    </div>
                    {/* Jobs Listing */}
                    <div className="mt-8 px-4">
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div key={job.id} className="border rounded-lg p-5 hover:shadow-lg transition-shadow bg-white">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold">{job.title}</h3>
                                            <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">{job.salary}</p>
                                            <p className="text-xs text-muted-foreground">{job.applicants} applicants</p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-foreground mb-4">{job.description}</p>
                                    
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold mb-2 text-muted-foreground">REQUIREMENTS:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.requirements.map((req, idx) => (
                                                <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs text-muted-foreground">Posted on {new Date(job.postedDate).toLocaleDateString()}</p>
                                        <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(Page);