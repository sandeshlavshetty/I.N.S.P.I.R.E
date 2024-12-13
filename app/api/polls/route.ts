import { NextResponse } from "next/server";
import Poll from "@/models/poll";
import { connectToPollDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        await connectToPollDB();

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

        // Create a new poll with the updated schema
        const newPoll = new Poll({
            name,
            options: pollOptions,
            date,
        });

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

export async function GET() {
    await connectToPollDB(); // Ensure this function doesn't reconnect unnecessarily

    try {
        // Fetch all active polls where status is 'active'
        const Polls = await Poll.find().lean(); // Use .lean() for better performance if you don't need Mongoose documents

        // Return success response with only active polls
        return NextResponse.json({ success: true, polls: Polls });
    } catch (error) {
        console.error("Error fetching polls:", error);

        // Add more specific error info if necessary
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

        return NextResponse.json(
            { success: false, message: `Error fetching polls: ${errorMessage}` },
            { status: 500 }
        );
    }
}
