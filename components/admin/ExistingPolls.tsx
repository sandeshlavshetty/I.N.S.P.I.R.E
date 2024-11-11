"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Clock,
	Trash2,
	Calendar as CalendarIcon,
	RefreshCcw,
} from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

export default function ExistingPolls() {
	const [polls, setPolls] = useState<Poll[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPolls = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/polls");
			const data = await response.json();
			if (data.success) {
				setPolls(data.polls);
			}
		} catch (error) {
			console.error("Error fetching polls:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPolls();
	}, []);

	const togglePollStatus = async (id: number, pollStatus: string) => {
		const updatedStatus = pollStatus === "active" ? "ended" : "active";

		try {
			const response = await fetch(`api/polls/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: updatedStatus }),
			});
			const data = await response.json();

			if (data.success) {
				setPolls(
					polls.map((poll) =>
						poll._id === id ? { ...poll, status: updatedStatus } : poll
					)
				);
			} else {
				console.error(data.message);
			}
		} catch (error) {
			console.error("Error updating poll", error);
		}
	};

	const deletePoll = async (id: number) => {
		try {
			const response = await fetch(`/api/polls/${id}`, {
				method: "DELETE",
			});

			const data = await response.json();
			if (data.success) {
				setPolls(polls.filter((poll) => poll._id !== id));
			} else {
				console.error(data.message);
			}
		} catch (error) {
			console.error("Error deleting poll:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-row justify-between">
					<CardTitle>Existing Polls</CardTitle>
					<Button size="icon" variant={"ghost"} onClick={fetchPolls}>
						<RefreshCcw />
					</Button>
				</div>
				<CardDescription>
					Manage and view results of current polls
				</CardDescription>
			</CardHeader>
			<CardContent className="w-full">
				{loading ? (
					<p>Fetching polls...</p>
				) : (
					<Table>
						{!polls.length ? (
							<p className="border-y py-4">No polls</p>
						) : (
							<>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Timings</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{polls.map((poll) => (
										<TableRow key={poll._id}>
											<TableCell>{poll.name}</TableCell>
											<TableCell>{poll.timings.join(", ")}</TableCell>

											<TableCell>
												<Badge
													variant={
														poll.status === "active"
															? "default"
															: poll.status === "pending"
															? "secondary"
															: "destructive"
													}>
													{poll.status}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															togglePollStatus(poll._id, poll.status)
														}>
														<Clock className="mr-2 h-4 w-4" />
														{poll.status === "active" ? "End" : "Start"}
													</Button>
													<Button
														size="sm"
														variant="destructive"
														onClick={() => deletePoll(poll._id)}>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</>
						)}
					</Table>
				)}
			</CardContent>
		</Card>
	);
}
