//write a post req to handle logout in the backend 

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        return NextResponse.json({ message: "Logout successful" }, { status: 200 });
    } catch (error) {
        console.error("Error logging out user:", error);
        return NextResponse.json({ error: "An error occurred during logout. Please try again." }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}