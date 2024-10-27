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
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlinePoll } from "react-icons/md";

export default function Page() {
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
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 flex gap-2">
                                        <MdOutlinePoll className="h-[15px] w-[15px]" />
                                        Poll
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    {/* First Row: Poll and Bus Timing */}
                    <div className="mx-auto w-full max-w-3xl flex flex-col md:flex-row gap-4">
                        {/* Poll Section */}
                        <div className="flex-1 h-50 rounded-xl bg-muted/50 p-4">
                            <Link href='/vote'>
                                <h2 className="text-lg font-bold">Poll</h2>
                                <p>After poll, token will be visible here.</p>
                            </Link>
                        </div>

                        {/* Bus Timing Section */}
                        <div className="flex-1 h-30 rounded-xl bg-muted/50 p-4">
                            <h2 className="text-lg font-bold">Bus Timing after Poll</h2>
                        </div>
                    </div>

                    {/* Second Row: Total Poll Responses (Full Width) */}
                    <div className="mx-auto w-full max-w-3xl h-full rounded-xl bg-muted/50 p-4">
                        <h2 className="text-lg font-bold">Total Poll Responses</h2>
                        {/* Add total poll responses content here */}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
