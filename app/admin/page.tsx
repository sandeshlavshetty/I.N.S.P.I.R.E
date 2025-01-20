'use client';

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { Button } from "@/components/ui/button";
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
import { LayoutDashboardIcon } from "lucide-react";
import CreatePollForm from "@/components/admin/CreatePollForm";
import ExistingPolls from "@/components/admin/ExistingPolls";
import withAdminAuth from "@/lib/withAdminAuth"; // Import the HOC

function AdminDashboard() {
    const [isClient, setIsClient] = useState(false);
    const [activeSection, setActiveSection] = useState<"create" | "existing">(
        "create"
    );

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
                {/* Header Section */}
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 flex gap-2">
                                        <LayoutDashboardIcon className="h-[15px] w-[15px]" />
                                        Admin Dashboard
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>

                {/* Main Content Section */}
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <div className="mx-auto w-full max-w-5xl">
                        {/* Toggle Buttons for Sections */}
                        <div className="flex justify-center space-x-4 mb-6">
                            <Button
                                variant={activeSection === "create" ? "default" : "outline"}
                                onClick={() => setActiveSection("create")}
                            >
                                Create New Poll
                            </Button>
                            <Button
                                variant={activeSection === "existing" ? "default" : "outline"}
                                onClick={() => setActiveSection("existing")}
                            >
                                View Existing Polls
                            </Button>
                        </div>

                        {/* Content for Selected Section */}
                        <div className="rounded-xl border bg-background shadow">
                            {activeSection === "create" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Create New Poll</h2>
                                    <CreatePollForm />
                                </div>
                            )}
                            {activeSection === "existing" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Existing Polls</h2>
                                    <ExistingPolls />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAdminAuth(AdminDashboard);