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
import { Clock, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

type PollOption = {
	option: string;
	votes: number;
};

type Poll = {
	_id: number;
	name: string;
	options: PollOption[];
	status: string;
};

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

		// Optimistically update the status in the UI first
		setPolls((prevPolls) =>
			prevPolls.map((poll) =>
				poll._id === id ? { ...poll, status: updatedStatus } : poll
			)
		);

		try {
			const response = await fetch(`/api/polls/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: updatedStatus }),
			});
			const data = await response.json();

			if (!data.success) {
				console.error(data.message);
			}
		} catch (error) {
			// If there is an error, revert the change made to the state
			console.error("Error updating poll", error);
			setPolls((prevPolls) =>
				prevPolls.map((poll) =>
					poll._id === id ? { ...poll, status: pollStatus } : poll
				)
			);
		}
	};

	const deletePoll = async (id: number) => {
		// Optimistically update the state by removing the deleted poll
		setPolls((prevPolls) => prevPolls.filter((poll) => poll._id !== id));

		try {
			const response = await fetch(`/api/polls/${id}`, {
				method: "DELETE",
			});
			const data = await response.json();

			if (!data.success) {
				console.error(data.message);
				// If delete failed, re-add the poll back to the list
				setPolls((prevPolls) => [...prevPolls, { _id: id, name: "Unknown", options: [], status: "pending" }]);
			}
		} catch (error) {
			console.error("Error deleting poll:", error);
			// If error occurs, re-add the poll back to the list
			setPolls((prevPolls) => [...prevPolls, { _id: id, name: "Unknown", options: [], status: "pending" }]);
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
				<CardDescription>Manage and view current polls</CardDescription>
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
										<TableHead>Options</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{polls.map((poll) => (
										<TableRow key={poll._id}>
											<TableCell>{poll.name}</TableCell>
											<TableCell>
												{poll.options
													.map((option) => `${option.option} (${option.votes} votes)`)
													.join(", ")}
											</TableCell>
											<TableCell>
												<Badge
													variant={
														poll.status === "active"
															? "default"
															: poll.status === "pending"
																? "secondary"
																: "destructive"
													}
												>
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
														}
													>
														<Clock className="mr-2 h-4 w-4" />
														{poll.status === "active" ? "End" : "Start"}
													</Button>
													<Button
														size="sm"
														variant="destructive"
														onClick={() => deletePoll(poll._id)}
													>
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
