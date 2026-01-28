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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { MdOutlinePoll } from "react-icons/md";
import { Zap, Code2, BookOpen, Lightbulb } from "lucide-react";
import Chat from "@/components/chat";
import withAuth from "@/lib/withAuth";

function Page() {
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'features' | 'history'>('chat');

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const conversationHistory = [
        {
            id: 1,
            title: "How to create a React component with TypeScript",
            date: "2024-01-18",
            messagesCount: 5,
        },
        {
            id: 2,
            title: "Debugging async/await in JavaScript",
            date: "2024-01-17",
            messagesCount: 8,
        },
        {
            id: 3,
            title: "Best practices for MongoDB schema design",
            date: "2024-01-16",
            messagesCount: 6,
        },
    ];

    const features = [
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Code Generation",
            description: "Generate code snippets in multiple languages",
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Smart Suggestions",
            description: "Get intelligent suggestions for code optimization",
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Documentation",
            description: "Generate documentation and comments for your code",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Quick Fixes",
            description: "Identify and fix common coding issues",
        },
    ];

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
                                        <Zap className="h-[15px] w-[15px]" />
                                        AI Coding Assistant
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
                <div className="px-4 py-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">🤖 AI Coding Assistant</h1>
                        <p className="text-muted-foreground">Get intelligent coding help powered by advanced AI</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 border-b">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-4 py-2 font-medium transition-colors ${
                                activeTab === 'chat'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            💬 Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('features')}
                            className={`px-4 py-2 font-medium transition-colors ${
                                activeTab === 'features'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            ✨ Features
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-2 font-medium transition-colors ${
                                activeTab === 'history'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            📋 History
                        </button>
                    </div>

                    {/* Chat Tab */}
                    {activeTab === 'chat' && (
                        <div className="max-w-4xl mx-auto">
                            <Chat />
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === 'features' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {features.map((feature, idx) => (
                                <Card key={idx} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="text-primary">{feature.icon}</div>
                                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold mb-4">Recent Conversations</h2>
                                {conversationHistory.map((conversation) => (
                                    <Card key={conversation.id} className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold mb-1">{conversation.title}</h3>
                                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                                        <span>📅 {new Date(conversation.date).toLocaleDateString()}</span>
                                                        <span>💬 {conversation.messagesCount} messages</span>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">View</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Commands */}
                    <div className="mt-12 max-w-4xl mx-auto">
                        <h2 className="text-lg font-semibold mb-4">⚡ Quick Commands</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <button className="p-3 border rounded-lg hover:bg-accent transition-colors text-left">
                                <p className="font-medium text-sm">Explain Code</p>
                                <p className="text-xs text-muted-foreground">Understand what code does</p>
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-accent transition-colors text-left">
                                <p className="font-medium text-sm">Generate Tests</p>
                                <p className="text-xs text-muted-foreground">Create unit tests for code</p>
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-accent transition-colors text-left">
                                <p className="font-medium text-sm">Optimize Code</p>
                                <p className="text-xs text-muted-foreground">Improve performance</p>
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-accent transition-colors text-left">
                                <p className="font-medium text-sm">Fix Errors</p>
                                <p className="text-xs text-muted-foreground">Debug and fix issues</p>
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-accent transition-colors text-left">
                                <p className="font-medium text-sm">Refactor Code</p>
                                <p className="text-xs text-muted-foreground">Improve code structure</p>
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-accent transition-colors text-left">
                                <p className="font-medium text-sm">API Documentation</p>
                                <p className="text-xs text-muted-foreground">Generate API docs</p>
                            </button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(Page);