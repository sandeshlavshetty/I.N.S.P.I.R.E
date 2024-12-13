import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToUserDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
    try {
        // Connect to the database
        await connectToUserDB();

        // Parse incoming request body
        const { email, password } = await req.json();

        // Validate that both email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        // Check if the user exists in the database by email
        const user = await User.findOne({ email });
        if (!user) {
            console.warn(`Login attempt failed: User not found for email: ${email}`);
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 400 }
            );
        }

        // Check if the password matches the stored hash
        const isPasswordValid = user.password
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!isPasswordValid) {
            console.warn(`Login attempt failed: Invalid password for email: ${email}`);
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 400 }
            );
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role }, // Payload
            process.env.JWT_SECRET!, // Secret key
            { expiresIn: "1d" } // Token expiration (1 day)
        );

        // Include the token in the response body
        return NextResponse.json(
            {
                message: "Login successful",
                token: token, // Include the token here
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json(
            { error: "An error occurred during login. Please try again." },
            { status: 500 }
        );
    }
}
