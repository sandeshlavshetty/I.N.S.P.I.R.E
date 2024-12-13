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
import Chat from "@/components/chat"; // Assuming you have a Chat component
import withAuth from "@/lib/withAuth";

function Page() {
    const [isClient, setIsClient] = useState(false);

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
                                        AI Chat Bot
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
                    {/* Chat Section */}
                    <header className="flex flex-col sm:flex-row items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-bold">AI Coding Assistant</h1>
                    </header>
                    <div className="my-5">
                        <Separator />
                    </div>
                    <div className="chat-container">
                        <Chat />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(Page);