"use client"

import * as React from "react"
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
} from "lucide-react"

import pfp from "@/app/assets/pfp.png"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Profile } from "./Profile"

const data = {
  navMain: [
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
      url: "/project-showcase",
      icon: Search,  
    },
    {
      title: "Job Posting",
      url: "/job-posting",
      icon: Inbox,  
    },
    {
      title: "AI Bot",
      url: "/ai-bot",
      icon: Bot,  
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="text-yellow-500" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">Inspire</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex">
          <Profile userName="John Doe" pfp={pfp.src} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

