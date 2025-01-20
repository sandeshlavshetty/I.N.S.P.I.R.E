import { NextResponse } from "next/server";
import Poll from "@/models/poll";
import getPollModel from "@/models/poll";

export async function POST(req: Request) {
    try {
        const Poll = await getPollModel(); // Get the Poll model

        const { name, options, date } = await req.json();

        // Validate required fields
        if (!name || !Array.isArray(options) || options.length === 0 || !date) {
            return NextResponse.json(
                { error: "Please provide a valid name, options, and date." },
                { status: 400 }
            );
        }

        // Map options to include votes
        const pollOptions = options.map((option: string) => ({
            option,
            votes: 0,
        }));

        // Create a new poll
        const newPoll = new Poll({
            name,
            options: pollOptions,
            date,
            status: "pending", // Default status
        });

        console.log("New poll created:", newPoll);
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

export async function GET() {
    try {
        const Poll = await getPollModel(); // Get the Poll model

        // Fetch all polls
        const polls = await Poll.find().lean(); // Use .lean() for better performance if you don't need Mongoose documents

        return NextResponse.json({ success: true, polls });
    } catch (error) {
        console.error("Error fetching polls:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

        return NextResponse.json(
            { success: false, message: `Error fetching polls: ${errorMessage}` },
            { status: 500 }
        );
    }
}
