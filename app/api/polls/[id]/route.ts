import { NextResponse } from "next/server";
import Poll from "@/models/poll";
import { connectToPollDB } from "@/lib/mongodb";

export async function DELETE(
	request: Request,
	{ params }: { params: { id: number } }
) {
	await connectToPollDB();

	const { id } = params;

	try {
		const deletedPoll = await Poll.findByIdAndDelete(id);
		if (!deletedPoll) {
			return NextResponse.json(
				{ success: false, message: "Poll not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ success: true, message: "Poll deleted" });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Error deleting poll" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: number } }
) {
	await connectToPollDB();

	const { id } = params;
	const { status } = await request.json();

	try {
		const updatedPoll = await Poll.findByIdAndUpdate(id, { status });

		if (!updatedPoll) {
			return NextResponse.json(
				{ success: false, message: "Poll not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			message: `Updated poll status to ${status}`,
			poll: updatedPoll,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ success: false, message: "Error updating poll" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } } // use string for MongoDB ObjectId
) {
	await connectToPollDB();

	const { id } = params;
	const { optionIndex } = await request.json(); // This is the index of the selected option.

	try {
		// Find the poll by ID
		const poll = await Poll.findById(id);
		if (!poll) {
			return NextResponse.json(
				{ success: false, message: "Poll not found" },
				{ status: 404 }
			);
		}

		// Check if the optionIndex is valid
		if (optionIndex < 0 || optionIndex >= poll.options.length) {
			return NextResponse.json(
				{ success: false, message: "Invalid option selected" },
				{ status: 400 }
			);
		}

		// Increment the vote count for the selected option
		poll.options[optionIndex].votes += 1;

		// Save the updated poll
		const updatedPoll = await poll.save();

		return NextResponse.json({
			success: true,
			message: "Vote recorded successfully",
			poll: updatedPoll,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, message: "Error updating poll" },
			{ status: 500 }
		);
	}
}