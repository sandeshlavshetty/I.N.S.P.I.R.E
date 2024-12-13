"use client";

import React from "react";
import {
  AudioWaveform,
  Blocks,
  Bot,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";

import pfp from "@/app/assets/pfp.png";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Profile } from "./Profile";
import { Separator } from "./ui/separator";

const navData = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Blocks,
  },
  {
    title: "Poll",
    url: "/poll",
    icon: Calendar,
  },
  {
    title: "Project Showcase",
    url: "/projects",
    icon: Search,
  },
  {
    title: "Job Posting",
    url: "/jobs",
    icon: Inbox,
  },
  {
    title: "AI Bot",
    url: "/bot",
    icon: Bot,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 bg-white" {...props}>
      {/* Header Section */}
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="text-yellow-500" size={24} />
          <h1 className="text-2xl font-bold text-[color:var(--sidebar-accent)]">
            Inspire
          </h1>
        </div>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <NavMain items={navData} />
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter>
        <Separator />
        <div className="flex justify-center items-center mt-4">
          <Profile userName="John Doe" pfp={pfp.src} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
