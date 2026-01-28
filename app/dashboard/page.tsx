'use client';

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, CheckCircle2, FileText, Briefcase, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import withAuth from "@/lib/withAuth";

function Page() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    // Mock data for dashboard
    const pollsCompleted = [
        {
            id: 1,
            title: "Preferred Frontend Framework",
            options: ["React", "Vue.js", "Angular", "Svelte"],
            userChoice: "React",
            status: "completed",
            date: "2024-01-15",
        },
        {
            id: 2,
            title: "Best Backend Runtime for 2024",
            options: ["Node.js", "Python (FastAPI)", "Go", "Rust"],
            userChoice: "Node.js",
            status: "completed",
            date: "2024-01-10",
        },
        {
            id: 3,
            title: "Database Preference",
            options: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
            userChoice: "MongoDB",
            status: "completed",
            date: "2024-01-05",
        },
    ];

    const projectsSubmitted = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce with React, Node.js, MongoDB",
            status: "approved",
            submittedDate: "2024-01-12",
            views: 342,
            likes: 28,
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Collaborative task manager with real-time updates",
            status: "pending",
            submittedDate: "2024-01-18",
            views: 156,
            likes: 12,
        },
        {
            id: 3,
            title: "Design System UI Components",
            description: "Reusable UI components with Storybook",
            status: "approved",
            submittedDate: "2024-01-08",
            views: 567,
            likes: 43,
        },
    ];

    const jobsApplied = [
        {
            id: 1,
            title: "Senior Full Stack Developer",
            company: "Tech Innovations Inc",
            location: "Remote",
            status: "interview",
            appliedDate: "2024-01-10",
            salary: "₹12-15 LPA",
        },
        {
            id: 2,
            title: "React Developer",
            company: "Digital Solutions Ltd",
            location: "Bangalore",
            status: "shortlisted",
            appliedDate: "2024-01-14",
            salary: "₹8-10 LPA",
        },
        {
            id: 3,
            title: "Backend Engineer",
            company: "Cloud Systems Pvt Ltd",
            location: "Remote",
            status: "applied",
            appliedDate: "2024-01-17",
            salary: "₹10-13 LPA",
        },
        {
            id: 4,
            title: "Frontend Engineer",
            company: "StartUp Hub",
            location: "Hyderabad",
            status: "rejected",
            appliedDate: "2024-01-03",
            salary: "₹6-8 LPA",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "interview":
                return "bg-blue-100 text-blue-800";
            case "shortlisted":
                return "bg-purple-100 text-purple-800";
            case "applied":
                return "bg-gray-100 text-gray-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

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
                                        <LayoutDashboardIcon className="h-[15px] w-[15px]" />Dashboard
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 px-4 py-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Polls Completed</CardTitle>
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{pollsCompleted.length}</div>
                                <p className="text-xs text-muted-foreground">Participated this month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Projects Submitted</CardTitle>
                                <FileText className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{projectsSubmitted.length}</div>
                                <p className="text-xs text-muted-foreground">Total submissions</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Jobs Applied</CardTitle>
                                <Briefcase className="h-4 w-4 text-purple-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{jobsApplied.length}</div>
                                <p className="text-xs text-muted-foreground">Active applications</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                                <TrendingUp className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1.2K</div>
                                <p className="text-xs text-muted-foreground">Total interactions</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Polls Completed */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Polls Participated</CardTitle>
                            <CardDescription>Your recent poll contributions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pollsCompleted.map((poll) => (
                                    <div key={poll.id} className="flex items-start justify-between border-b pb-4 last:border-b-0">
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{poll.title}</p>
                                            <p className="text-xs text-muted-foreground">Your choice: <span className="font-medium text-foreground">{poll.userChoice}</span></p>
                                            <p className="text-xs text-muted-foreground mt-1">Voted on {new Date(poll.date).toLocaleDateString()}</p>
                                        </div>
                                        <Badge variant="outline" className="bg-blue-50">Completed</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Projects Submitted */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects Submitted</CardTitle>
                            <CardDescription>Track your project submissions and engagement</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {projectsSubmitted.map((project) => (
                                    <div key={project.id} className="flex items-start justify-between border-b pb-4 last:border-b-0">
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{project.title}</p>
                                            <p className="text-xs text-muted-foreground">{project.description}</p>
                                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                                <span>👁️ {project.views} views</span>
                                                <span>❤️ {project.likes} likes</span>
                                                <span>Submitted: {new Date(project.submittedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <Badge className={getStatusColor(project.status)}>
                                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Jobs Applied */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Applications</CardTitle>
                            <CardDescription>Monitor your job application status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {jobsApplied.map((job) => (
                                    <div key={job.id} className="flex items-start justify-between border-b pb-4 last:border-b-0">
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{job.title}</p>
                                            <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                                <span>💰 {job.salary}</span>
                                                <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <Badge className={getStatusColor(job.status)}>
                                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default withAuth(Page);