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
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CreateNewPoll() {
	const [newPoll, setNewPoll] = useState({
		name: "",
		options: [] as string[],
		date: undefined as Date | undefined,
	});
	const [newOption, setNewOption] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const createPolls = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const response = await fetch("/api/polls", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newPoll),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to create poll");
			}

			setSubmitMessage("Poll created successfully!");
			setNewPoll({ name: "", options: [], date: undefined });
		} catch (error: any) {
			setSubmitMessage(error.message || "Error creating poll");
		} finally {
			setIsSubmitting(false);
		}
	};

	const addOption = () => {
		if (newOption && !newPoll.options.includes(newOption)) {
			setNewPoll({ ...newPoll, options: [...newPoll.options, newOption].sort() });
			setNewOption("");
		}
	};

	const removeOption = (option: string) => {
		setNewPoll({
			...newPoll,
			options: newPoll.options.filter((opt) => opt !== option),
		});
	};

	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Create New Poll</CardTitle>
				<CardDescription>
					Create a poll with a name, options, and an optional date.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={createPolls} className="space-y-4">
					<div>
						<Label htmlFor="pollName">Poll Name</Label>
						<Input
							id="pollName"
							value={newPoll.name}
							onChange={(e) => setNewPoll({ ...newPoll, name: e.target.value })}
							placeholder="e.g., Favorite Fruit"
							required
						/>
					</div>
					<div>
						<Label>Options</Label>
						<div className="flex items-center space-x-2">
							<Input
								value={newOption}
								onChange={(e) => setNewOption(e.target.value)}
								placeholder="Add an option"
							/>
							<Button type="button" onClick={addOption}>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{newPoll.options.map((option) => (
								<Badge key={option} variant="secondary" className="text-sm">
									{option}
									<button
										type="button"
										onClick={() => removeOption(option)}
										className="ml-1 hover:text-destructive"
									>
										<X className="h-3 w-3" />
									</button>
								</Badge>
							))}
						</div>
					</div>
					<div>
						<Label>Date (Optional)</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!newPoll.date && "text-muted-foreground"
									)}
								>
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
							)}
						>
							{submitMessage}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
