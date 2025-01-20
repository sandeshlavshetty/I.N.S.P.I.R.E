"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdSettings } from "react-icons/md";
import withAuth from "@/lib/withAuth";

function SettingsPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState(false);

    const handleProfileUpdate = () => {
        alert("Profile updated successfully!");
    };

    const handlePasswordChange = () => {
        alert("Password changed successfully!");
    };

    const handleNotificationsToggle: () => void = () => {
        setNotifications(!notifications);
    };

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
                                        <MdSettings className="h-[15px] w-[15px]" />
                                        Settings
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="p-6 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
                    <Separator className="my-4" />

                    {/* Profile Information Section */}
                    <section className="mb-8">
                        <h2 className="text-lg font-medium">Profile Information</h2>
                        <div className="mt-4">
                            <label className="block font-medium mb-2">Username</label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block font-medium mb-2">Email</label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <Button onClick={handleProfileUpdate} className="mt-4 bg-primary text-white">
                            Update Profile
                        </Button>
                    </section>

                    <Separator className="my-4" />

                    {/* Password Change Section */}
                    <section className="mb-8">
                        <h2 className="text-lg font-medium">Change Password</h2>
                        <div className="mt-4">
                            <label className="block font-medium mb-2">New Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <Button onClick={handlePasswordChange} className="mt-4 bg-primary text-white">
                            Change Password
                        </Button>
                    </section>

                    <Separator className="my-4" />

                    {/* Notification Settings Section */}
                    <section className="mb-8">
                        <h2 className="text-lg font-medium">Notification Settings</h2>
                        <div className="flex items-center mt-4">
                            <label className="block font-medium mb-2 mr-4">Enable Notifications</label>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={handleNotificationsToggle}
                            />
                        </div>
                        <Button onClick={handleNotificationsToggle} className="mt-4 bg-primary text-white">
                            {notifications ? "Disable" : "Enable"} Notifications
                        </Button>
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(SettingsPage);