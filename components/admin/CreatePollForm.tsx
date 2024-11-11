"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { generateTimeOptions } from "@/lib/utils";

export default function CreateNewPoll() {
	const [newPoll, setNewPoll] = useState({
		name: "",
		timings: [] as string[],
		date: undefined as Date | undefined,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const createPoll = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const response = await fetch("/api/polls", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newPoll),
			});

			if (!response.ok) {
				const err = await response.json();
				throw new Error(err.error);
			}

			setSubmitMessage("Poll created successfully!");
			setNewPoll({ name: "", timings: [], date: undefined });
		} catch (error) {
			console.error("Unable to create poll.\n", error);
			setSubmitMessage("Error creating poll. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const addTiming = (time: string) => {
		if (!newPoll.timings.includes(time)) {
			setNewPoll({ ...newPoll, timings: [...newPoll.timings, time].sort() });
		}
	};

	const removeTiming = (time: string) => {
		setNewPoll({
			...newPoll,
			timings: newPoll.timings.filter((t) => t !== time),
		});
	};

	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Create New Poll</CardTitle>
				<CardDescription>
					Add a new bus route poll with multiple timings and a date
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={createPoll} className="space-y-4">
					<div>
						<Label htmlFor="pollName">Poll Name</Label>
						<Input
							id="pollName"
							value={newPoll.name}
							onChange={(e) => setNewPoll({ ...newPoll, name: e.target.value })}
							placeholder="e.g., Morning Route"
							required
						/>
					</div>
					<div>
						<Label>Timings</Label>
						<div className="flex items-center space-x-2">
							<Select onValueChange={addTiming}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select time" />
								</SelectTrigger>
								<SelectContent>
									{generateTimeOptions().map((time) => (
										<SelectItem key={time} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{newPoll.timings.map((time) => (
								<Badge key={time} variant="secondary" className="text-sm">
									{time}
									<button
										type="button"
										onClick={() => removeTiming(time)}
										className="ml-1 hover:text-destructive">
										<X className="h-3 w-3" />
									</button>
								</Badge>
							))}
						</div>
					</div>
					<div>
						<Label>Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!newPoll.date && "text-muted-foreground"
									)}>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{newPoll.date ? (
										format(newPoll.date, "PPP")
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={newPoll.date}
									onSelect={(date) => setNewPoll({ ...newPoll, date })}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Creating..." : "Create Poll"}
					</Button>
					{submitMessage && (
						<p
							className={cn(
								"mt-2 text-sm",
								submitMessage.includes("Error")
									? "text-destructive"
									: "text-green-600"
							)}>
							{submitMessage}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
