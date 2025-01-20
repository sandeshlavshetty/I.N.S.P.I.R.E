import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Clear the HttpOnly cookie by setting it with an expired date
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        response.cookies.set("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/", // Ensure the cookie is removed site-wide
            expires: new Date(0), // Expire the cookie immediately
        });

        return response;
    } catch (error) {
        console.error("Error logging out user:", error);
        return NextResponse.json({ error: "An error occurred during logout. Please try again." }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
