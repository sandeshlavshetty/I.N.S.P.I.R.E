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
import { Button } from "@/components/ui/button";
import withAuth from "@/lib/withAuth";

function Page() {
    const [polls, setPolls] = useState<{ _id: string; name: string; options: { option: string; votes: number }[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number | null }>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [results, setResults] = useState<{ id: string; title: string; options: { option: string; votes: number }[] }[]>([]);

    useEffect(() => {
        async function fetchPolls() {
            try {
                const response = await fetch("/api/polls");
                const data = await response.json();
                if (Array.isArray(data.polls)) {
                    interface PollOption {
                        option: string;
                        votes: number;
                    }

                    interface Poll {
                        _id: string;
                        name: string;
                        options: PollOption[];
                        status: string;
                    }

                    interface PollsResponse {
                        polls: Poll[];
                    }

                    const activePolls = (data as PollsResponse).polls.filter((poll: Poll) => poll.status === "active");
                    setPolls(activePolls);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch polls:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPolls();
    }, []);

    const handleVote = async (pollId: string) => {
        const selectedOptionIndex = selectedOptions[pollId];
        
        if (selectedOptionIndex !== null) {
            try {
                // Increment the vote count for the selected option
                const updatedPolls = polls.map((poll) => {
                    if (poll._id === pollId) {
                        const updatedOptions = poll.options.map((option, index) => {
                            if (index === selectedOptionIndex) {
                                return { ...option, votes: option.votes + 1 }; // Increment vote count
                            }
                            return option;
                        });
                        return { ...poll, options: updatedOptions };
                    }
                    return poll;
                });
    
                setPolls(updatedPolls); // Update local state
    
                const response = await fetch(`/api/polls/${pollId}`, {
                    method: "PUT", // Change method to PUT
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ optionIndex: selectedOptionIndex }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setSuccessMessage(`Vote recorded for Poll ${pollId}: ${data.message}`);
                    setTimeout(() => setSuccessMessage(""), 3000);
                } else {
                    const errorData = await response.json();
                    console.error("Failed to vote:", errorData.error);
                    setSuccessMessage(`Failed to vote: ${errorData.error}`);
                }
            } catch (error) {
                console.error("Error during voting:", error);
                setSuccessMessage("An error occurred while submitting your vote.");
            }
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
                                <div key={poll._id} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 w-full sm:w-1/3">
                                    <h2 className="text-lg font-semibold">{poll.name}</h2>
                                    <p className="text-sm text-gray-500 italic">Choose your preferred option:</p>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {poll.options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name={`poll-${poll._id}`}
                                                    id={`option${index + 1}`}
                                                    value={index}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    onChange={() => setSelectedOptions({ ...selectedOptions, [poll._id]: index })}
                                                />
                                                <label htmlFor={`option${index + 1}`} className="text-sm">{option.option}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors duration-300"
                                            onClick={() => {
                                                handleVote(poll._id);
                                            }}
                                            disabled={selectedOptions[poll._id] === null} // Disable button if no option selected
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
                                        {result.options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-sm">{option.option}</span>
                                                <span className="text-sm text-gray-500">- {option.votes} votes</span>
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

export default withAuth(Page);