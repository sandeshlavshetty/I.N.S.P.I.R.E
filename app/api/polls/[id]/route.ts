import { NextResponse } from "next/server";
import Poll from "@/models/Poll";
import { connectToDB } from "@/lib/mongodb";

export async function DELETE(
	request: Request,
	{ params }: { params: { id: number } }
) {
	await connectToDB();

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
	await connectToDB();

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
