import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    try {
        // Extract the auth token from cookies
        const cookie = req.headers.get("cookie");
        const token = cookie
            ?.split("; ")
            .find((item) => item.startsWith("authToken="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json(
                { authenticated: false, error: "No token provided." },
                { status: 401 }
            );
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        return NextResponse.json(
            { authenticated: true, user: decoded }, // Include user data if needed
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying auth token:", error);
        return NextResponse.json(
            { authenticated: false, error: "Invalid or expired token." },
            { status: 401 }
        );
    }
}
