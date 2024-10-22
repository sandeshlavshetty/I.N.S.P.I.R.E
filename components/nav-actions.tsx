"use client"

import * as React from "react"
import {

  Bell,
  LogOut,
  MoreHorizontal,
  Settings2,
  Star,
  User,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = [
  [
    {
      title: "Profile",
      icon: User,
      url: "/profile",
    },
    {
      title: "Settings",
      icon: Settings2,
      url: "/settings",
    },
    {
      title: "Logout",
      icon: LogOut,
      url: "/logout",
    }
  ]
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Bell />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index}>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <Link href={item.url}>

                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                              <item.icon className="w-5 h-5" />
                              <span className="ml-2">{item.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </Link>

                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
