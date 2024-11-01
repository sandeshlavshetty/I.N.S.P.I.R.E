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
import { useEffect, useState } from "react";
import { MdOutlinePoll } from "react-icons/md";
import globalApi from "@/GlobalApi/globals";
import { Button } from "@/components/ui/button";

export default function Page() {
    interface Poll {
        id: number;
        title: number;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
    }

    interface Result {
        id: number;
        title: string;
        option1: number;
        option2: number;
        option3: number;
        option4: number
    }

    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({}); // To track selected options
    const [successMessage, setSuccessMessage] = useState("");
    const [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        async function fetchPolls() {
            try {
                const data: Poll[] = await globalApi.getPolls();
                setPolls(data);
                console.log("Polls:", data);
            } catch (error) {
                console.error("Failed to fetch polls:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPolls();
    }, []);

    const handleVote = (pollId: number) => {
        if (selectedOptions[pollId] !== null) {
            // Handle the voting logic here (e.g., call an API to submit the vote)
            setSuccessMessage(`You voted for Poll ${pollId}`);
            setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
        }
    };

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
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-bold">Polls</h1>
                    </div>
                    <Separator />
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                            {successMessage}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-4 mx-20">
                        {loading ? (
                            <div className="flex justify-center items-center w-full h-48">
                                <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-2-2 2-2 2 2-2 2 2 2-2 2 2 2-2 2a8 8 0 01-8-8z"></path>
                                </svg>
                            </div>
                        ) : (
                            polls.map((poll) => (
                                <div key={poll.id} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 w-full sm:w-1/3">
                                    <h2 className="text-lg font-semibold">{poll.title}</h2>
                                    <p className="text-sm text-gray-500 italic">Choose your preferred option:</p>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {[poll.option1, poll.option2, poll.option3, poll.option4].map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name={`poll-${poll.id}`}
                                                    id={`option${optionIndex + 1}`}
                                                    value={optionIndex}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    onChange={() => setSelectedOptions({ ...selectedOptions, [poll.id]: optionIndex })}
                                                />
                                                <label htmlFor={`option${optionIndex + 1}`} className="text-sm">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors duration-300"
                                            onClick={() => handleVote(poll.id)}
                                            disabled={selectedOptions[poll.id] === null} // Disable button if no option selected
                                        >
                                            Vote
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-bold">Poll Stats and Schedule</h1>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-4 mx-20">
                        <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 w-full sm:w-1/3">
                            <h2 className="text-lg font-semibold">Poll Stats</h2>
                            <p className="text-sm text-gray-500 italic">View the stats of the polls</p>
                            <div className="mt-4"></div>
                            {results.map((result) => (
                                <div key={result.id} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 w-full sm:w-1/3">
                                    <h2 className="text-lg font-semibold">{result.title}</h2>
                                    <p className="text-sm text-gray-500 italic">Poll Results:</p>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {[result.option1, result.option2, result.option3, result.option4].map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex items-center gap-2">
                                                <span className="text-sm">{option}</span>
                                                <span className="text-sm text-gray-500">- {Math.floor(Math.random() * 100)} votes</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </SidebarInset>
        </SidebarProvider >
    );
}
