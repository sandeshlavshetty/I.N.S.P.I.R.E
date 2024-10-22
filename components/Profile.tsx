"use client"

import * as React from "react"
import { Bolt, ChevronDown, LogOut, Plus, User } from "lucide-react"
import Link from "next/link" // Use next/link for navigation
import Image from "next/image" // Import Image from next/image for the profile picture

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenuButton,
} from "@/components/ui/sidebar"

// Adjusted items array with titles and icons
const menuItems = [
    {
        title: "Profile",
        icon: User,
        url: "/profile", // URL for Link
    },
    {
        title: "Settings",
        icon: Bolt,
        url: "/settings", // URL for Link
    },
    {
        title: "LogOut",
        icon: LogOut,
        url: "/logout", // URL for Link
    },
]

export function Profile({ userName, pfp }: { userName: string, pfp: string }) {
    const [activeItem, setActiveItem] = React.useState(menuItems[0])
    const [isMounted, setIsMounted] = React.useState(false)

    // Ensure the component renders only on the client side
    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null // Prevent rendering on server to avoid mismatch
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-fit px-1.5">
                    <div className="flex items-center space-x-2">
                        {isMounted && (
                            <Image src={pfp} alt="Profile Picture" width={50} height={50} className="rounded-full" />
                        )}
                        <span className="truncate font-semibold">{userName}</span>
                        <ChevronDown className="opacity-50" />
                    </div>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
            >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Menu
                </DropdownMenuLabel>
                {menuItems.map((item, index) => (
                    <DropdownMenuItem
                        key={item.title}
                        onClick={() => setActiveItem(item)}
                        className="gap-2 p-2"
                    >
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                            <item.icon className="size-4 shrink-0" />
                        </div>
                        <Link href={item.url} className="w-full">
                            {item.title}
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add item</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
