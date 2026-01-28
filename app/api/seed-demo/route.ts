import { NextResponse } from "next/server";
import { seedDemoData } from "@/lib/seedDemoData";

export async function POST(req: Request) {
    try {
        // Optional: Add authentication check here if needed
        const result = await seedDemoData();

        return NextResponse.json(
            {
                message: "Demo data seeded successfully",
                ...result,
            },
            { status: 201 }
        );
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Error seeding demo data:", errorMessage);

        return NextResponse.json(
            {
                error: "Failed to seed demo data",
                details: errorMessage,
            },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    return NextResponse.json(
        {
            message: "Demo data seeding endpoint",
            info: "Send a POST request to this endpoint to seed demo data",
            demoCredentials: [
                {
                    email: "priya.sharma@example.com",
                    password: "TestPass123!",
                    role: "student",
                },
                {
                    email: "rajesh.patel@example.com",
                    password: "TestPass123!",
                    role: "student",
                },
                {
                    email: "ananya.verma@example.com",
                    password: "TestPass123!",
                    role: "student",
                },
                {
                    email: "admin@example.com",
                    password: "AdminPass123!",
                    role: "admin",
                },
                {
                    email: "vikram.kumar@example.com",
                    password: "TestPass123!",
                    role: "student",
                },
            ],
        },
        { status: 200 }
    );
}
