import { NextResponse } from "next/server";
import Poll from "@/models/Poll";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
	try {
		await connectToDB();

		const { name, timings, date } = await req.json();

		if (!name || !timings.length || !date) {
			return NextResponse.json(
				{ error: "Please provide a valid name, timings, and date." },
				{ status: 400 }
			);
		}

		const newPoll = new Poll({ name, timings, date });
		console.log("New poll created.", newPoll);
		await newPoll.save();

		return NextResponse.json(
			{ message: "Poll created successfully", poll: newPoll },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating poll:", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
