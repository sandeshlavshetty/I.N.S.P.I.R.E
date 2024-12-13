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
import { Profile } from "../Profile"
import { Separator } from "../ui/separator"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/admin",
      icon: Blocks,
    },
    {
      title: "Project Showcase",
      url: "/admin/projects",
      icon: Search,  
    },
    {
      title: "Job Posting",
      url: "/admin/jobs",
      icon: Inbox,  
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 bg-white " {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="text-yellow-500" size={24} />
          <h1 className="text-2xl font-bold text-[color:var(--sidebar-accent)]">Inspire</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Separator></Separator>
        <div className="flex">
          <Profile userName="John Doe" pfp={pfp.src} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

