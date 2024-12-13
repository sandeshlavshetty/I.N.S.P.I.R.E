"use client";

import React, { useState, useEffect } from "react";
import { Bell, LogOut, MoreHorizontal, Settings2, Star, Sun, Moon, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const actionsData = [
  [
    { title: "Profile", icon: User, url: "/profile" },
    { title: "Settings", icon: Settings2, url: "/settings" },
    { title: "Logout", icon: LogOut }, // Logout logic will handle this
  ],
];

export function NavActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks user authentication state
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Tracks logout process state

  // Toggle theme between light and dark modes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Apply the appropriate theme class to the document body
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Check if the user is logged in (e.g., by checking local storage or cookies)
    const token = localStorage.getItem("token"); // Replace with your auth logic
    setIsLoggedIn(!!token);
  }, [isDarkMode]);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Show loading state during logout
    try {
      // Optional: Call API to invalidate session on the server
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to log out from the server.");
      }

      // Clear client-side authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      window.location.href = "/login"; // Redirect to homepage or login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Theme toggle button */}
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleTheme}>
        {isDarkMode ? <Moon /> : <Sun />}
      </Button>

      {/* User actions dropdown */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
            disabled={isLoggingOut} // Disable button during logout
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 overflow-hidden rounded-lg p-0" align="end">
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {isLoggedIn ? (
                // Logged-in user actions
                actionsData.map((group, index) => (
                  <SidebarGroup key={index}>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <React.Fragment key={index}>
                            {item.title === "Logout" ? (
                              <SidebarMenuItem>
                                <SidebarMenuButton onClick={handleLogout}>
                                  <item.icon className="w-5 h-5" />
                                  <span className="ml-2">
                                    {isLoggingOut ? "Logging out..." : item.title}
                                  </span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ) : (
                              item.url && (
                                <Link href={item.url}>
                                  <SidebarMenuItem>
                                    <SidebarMenuButton>
                                      <item.icon className="w-5 h-5" />
                                      <span className="ml-2">{item.title}</span>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                </Link>
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))
              ) : (
                // Guest user actions (e.g., login/signup)
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <Link href="/login">
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <User className="w-5 h-5" />
                            <span className="ml-2">Login</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </Link>
                      <Link href="/signup">
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <Star className="w-5 h-5" />
                            <span className="ml-2">Signup</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </Link>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
