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
import { TokenCard } from "@/components/TokenCard";
import { useUserContext } from "../context/UserContext";

function Page() {
    const { user } = useUserContext(); // Access the user context
    const [polls, setPolls] = useState<{
        _id: string;
        name: string;
        date: Date;
        options: { option: string; votes: number }[];
        voters: string[];
    }[]>([]);
    const [votedPolls, setVotedPolls] = useState<{
        id: string;
        title: string;
        chosenOption: string;
    }[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: number | null;
    }>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const userId = user?._id;

    useEffect(() => {
        async function fetchPolls() {
            try {
                const response = await fetch("/api/polls");
                const data = await response.json();

                if (Array.isArray(data.polls)) {
                    const activePolls = data.polls.filter(
                        (poll: any) =>
                            poll.status === "active" &&
                            !poll.votes.some(
                                (vote: { userId: string; chosenOption: string }) =>
                                    vote.userId === userId
                            )
                    );

                    const alreadyVotedPolls = data.polls
                        .filter((poll: any) =>
                            poll.votes.some(
                                (vote: { userId: string; chosenOption: string }) =>
                                    vote.userId === userId
                            )
                        )
                        .map((poll: any) => ({
                            id: poll._id,
                            title: poll.name,
                            chosenOption: poll.votes.find(
                                (vote: { userId: string; chosenOption: string }) =>
                                    vote.userId === userId
                            ).chosenOption,
                        }));

                    setPolls(activePolls);
                    setVotedPolls(alreadyVotedPolls);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch polls:", error);
                setErrorMessage("Error fetching polls. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchPolls();
    }, [userId]);

    const handleVote = async (pollId: string) => {
        const selectedOptionIndex = selectedOptions[pollId];

        if (selectedOptionIndex !== null) {
            try {
                const response = await fetch(`/api/polls/${pollId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ optionIndex: selectedOptionIndex, userId }),
                });

                if (response.ok) {
                    const poll = polls.find((poll) => poll._id === pollId);
                    if (poll) {
                        const chosenOption = poll.options[selectedOptionIndex].option;

                        setVotedPolls((prevTokens) => [
                            ...prevTokens,
                            { id: pollId, title: poll.name, chosenOption },
                        ]);

                        setPolls((prevPolls) =>
                            prevPolls.filter((poll) => poll._id !== pollId)
                        );

                        setSuccessMessage("Vote recorded successfully!");
                        setTimeout(() => setSuccessMessage(""), 3000);
                    }
                } else {
                    const errorData = await response.json();
                    console.error("Failed to vote:", errorData.error);
                    setErrorMessage(errorData.error || "Failed to submit vote.");
                }
            } catch (error) {
                console.error("Error during voting:", error);
                setErrorMessage("An error occurred while submitting your vote.");
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
                    <h1 className="text-xl sm:text-2xl font-bold">Active Polls</h1>
                    <Separator />
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4">
                        {loading ? (
                            <div>Loading...</div>
                        ) : polls.length > 0 ? ( // Check if polls array has any items
                            polls.map((poll) => (
                                <div key={poll._id} className="p-4 border rounded-lg shadow-md">
                                    <h2 className="text-lg font-semibold">{poll.name}</h2>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {poll.options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name={`poll-${poll._id}`}
                                                    value={index}
                                                    onChange={() =>
                                                        setSelectedOptions({
                                                            ...selectedOptions,
                                                            [poll._id]: index,
                                                        })
                                                    }
                                                />
                                                <label>{option.option}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => handleVote(poll._id)}
                                        disabled={selectedOptions[poll._id] === null}
                                    >
                                        Vote
                                    </Button>
                                </div>
                            ))
                        ) : (
                            // Message for when there are no active polls
                            <div className="text-gray-500 italic text-center w-full">
                                No active polls to display. Check back later!
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <h1 className="text-xl sm:text-2xl font-bold">Your Tokens</h1>
                    <Separator />
                    {votedPolls.length === 0 ? (
                        <p>No tokens yet. Vote to earn tokens!</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {votedPolls.map((token) => (
                                <TokenCard
                                    key={token.id}
                                    pollName={token.title}
                                    date={new Date()} // Assuming date is available
                                    chosenOption={token.chosenOption}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default withAuth(Page);
